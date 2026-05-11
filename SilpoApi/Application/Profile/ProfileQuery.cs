using MediatR;

namespace Application.Account;

public record ProfileQuery(int id)
    : IRequest<ProfileDto>;