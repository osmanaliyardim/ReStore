namespace ReStoreWebAPI.RequestHelpers;

public class ProductParams : PaginationParams
{
    public string OrderBy { get; set; }

    public string SearchParam { get; set; }

    public string Brands { get; set; }

    public string Types { get; set; }
}
