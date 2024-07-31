using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities;
using ReStoreWebAPI.Extensions;
using ReStoreWebAPI.RequestHelpers;
using ReStoreWebAPI.Services;

namespace ReStoreWebAPI.Controllers;

public class ProductController : BaseApiController
{
    private readonly StoreContext _storeContext;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public ProductController(
        StoreContext storeContext,
        IMapper mapper,
        ImageService imageService)
    {
        _storeContext = storeContext;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
        var query = _storeContext.Products
            .Search(productParams.SearchParam)
            .Filter(productParams.Brands, productParams.Types)
            .Sort(productParams.OrderBy)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);

        return Ok(products);
    }

    [HttpGet("{id}", Name = nameof(GetProduct))]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _storeContext.Products.FindAsync(id);

        if (product == null) return NotFound();

        return Ok(product);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _storeContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _storeContext.Products.Select(p => p.Type).Distinct().ToListAsync();

        return Ok(new { brands, types });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
    {
        var product = _mapper.Map<Product>(productDto);

        if (productDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);

            if (imageResult.Error != null)
            {
                return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Problem occurred when uploading product image (see details)",
                        Detail = imageResult.Error.Message
                    }
                );
            }

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        await _storeContext.Products.AddAsync(product);

        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute(nameof(GetProduct), new { Id = product.Id }, product);

        return BadRequest(new ProblemDetails { Title = "Problem occurred when creating a new product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
    {
        var productToUpdate = await _storeContext.Products.FindAsync(productDto.Id);

        if (productToUpdate == null) return NotFound();

        _mapper.Map(productDto, productToUpdate);

        if (productDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);

            if (imageResult.Error != null)
            {
                return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Problem occurred when uploading product image (see details)",
                        Detail = imageResult.Error.Message
                    }
                );
            }

            // If the image is already on Cloudinary, remove it
            if (!string.IsNullOrEmpty(productToUpdate.PublicId))
                await _imageService.DeleteImageAsync(productToUpdate.PublicId);

            productToUpdate.PictureUrl = imageResult.SecureUrl.ToString();
            productToUpdate.PublicId = imageResult.PublicId;
        }

        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return Ok(productToUpdate);

        return BadRequest(new ProblemDetails { Title = $"Problem occurred when editing the product with ID: {productDto.Id}" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var productToDelete = await _storeContext.Products.FindAsync(id);

        if (productToDelete == null) return NotFound();

        // If the image is on Cloudinary (not on local), remove it
        if (!string.IsNullOrEmpty(productToDelete.PublicId))
            await _imageService.DeleteImageAsync(productToDelete.PublicId);

        _storeContext.Remove(productToDelete);

        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return Accepted();

        return BadRequest(new ProblemDetails { Title = $"Problem occurred when deleting the product with ID: {id}" });
    }
}