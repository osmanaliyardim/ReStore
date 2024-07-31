using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities;
using ReStoreWebAPI.Extensions;
using ReStoreWebAPI.RequestHelpers;

namespace ReStoreWebAPI.Controllers;

public class ProductController : BaseApiController
{
    private readonly StoreContext _storeContext;
    private readonly IMapper _mapper;

    public ProductController(StoreContext storeContext, IMapper mapper)
    {
        _storeContext = storeContext;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
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
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
    {
        var product = _mapper.Map<Product>(productDto);

        await _storeContext.Products.AddAsync(product);

        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute(nameof(GetProduct), new {Id = product.Id}, product);

        return BadRequest(new ProblemDetails { Title = "Problem occurred when creating a new product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult> UpdateProduct(UpdateProductDto productDto)
    {
        var productToUpdate = await _storeContext.Products.FindAsync(productDto.Id);

        if (productToUpdate == null) return NotFound();

        _mapper.Map(productDto, productToUpdate);

        var result = await _storeContext.SaveChangesAsync() > 0;
        
        if (result) return NoContent();

        return BadRequest(new ProblemDetails { Title = $"Problem occurred when editing the product with ID: {productDto.Id}" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var productToDelete = await _storeContext.Products.FindAsync(id);

        if (productToDelete == null) return NotFound();

        _storeContext.Remove(productToDelete);

        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return Accepted();

        return BadRequest(new ProblemDetails { Title = $"Problem occurred when deleting the product with ID: {id}" });
    }
}