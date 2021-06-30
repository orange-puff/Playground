using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Playground.Models;

namespace Playground.EF.Mapping
{
    public class TempMapping : IEntityTypeConfiguration<Temp>
    {
        public void Configure(EntityTypeBuilder<Temp> builder)
        {
            builder.ToTable("Temp");
            builder.HasKey(tmp => tmp.TempId);
            builder.Property(tmp => tmp.TempName)
                .HasMaxLength(128);
        }
    }
}
