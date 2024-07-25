using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.Entities;
using ReStoreWebAPI.Extensions;
using ReStoreWebAPI.RequestHelpers;

namespace ReStoreWebAPI.Controllers;

public class ProductController : BaseApiController
{
    private readonly StoreContext _storeContext;

    public ProductController(StoreContext storeContext)
    {
        _storeContext = storeContext;
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

    [HttpGet("{id}")]
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
}