using AutoMapper;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities;

namespace ReStoreWebAPI.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>()
            .ReverseMap();

        CreateMap<UpdateProductDto, Product>()
            .ReverseMap();
    }
}
