FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app


COPY . .
RUN ls
RUN dotnet restore Playground.Web.csproj
RUN dotnet publish -c Release -o Playground.Web/out Playground.Web.csproj


RUN ls
