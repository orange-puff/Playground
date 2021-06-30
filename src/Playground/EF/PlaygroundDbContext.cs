using Microsoft.EntityFrameworkCore;

namespace Playground.EF
{
    public class PlaygroundDbContext : DbContext
    {
        public PlaygroundDbContext(DbContextOptions<PlaygroundDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}
