using ReStoreWebAPI.Entities;

namespace ReStoreWebAPI.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

        query = orderBy switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchParameter)
    {
        if (string.IsNullOrWhiteSpace(searchParameter)) return query;

        var trimmedAndLoweredParam = searchParameter.Trim().ToLower();

        var searchResult = query.Where(product => product.Name.ToLower().Contains(trimmedAndLoweredParam));

        return searchResult;
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.ToLower().Split(",").ToList());

        if (!string.IsNullOrEmpty(types))
            typeList.AddRange(types.ToLower().Split(",").ToList());

        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
        query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

        return query;
    }
}
