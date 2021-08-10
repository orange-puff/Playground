using Microsoft.EntityFrameworkCore.Migrations;

namespace Playground.Migrations
{
    public partial class AddWordsPerMinuteFrequencyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TempName",
                table: "Temp",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128)",
                oldMaxLength: 128,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "WordsPerMinuteFrequency",
                columns: table => new
                {
                    WordsPerMinute = table.Column<int>(nullable: false),
                    Frequency = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordsPerMinuteFrequency", x => x.WordsPerMinute);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WordsPerMinuteFrequency");

            migrationBuilder.AlterColumn<string>(
                name: "TempName",
                table: "Temp",
                type: "varchar(128)",
                maxLength: 128,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 128);
        }
    }
}
