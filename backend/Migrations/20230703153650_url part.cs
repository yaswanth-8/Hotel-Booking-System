using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class urlpart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url1",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url2",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url3",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url4",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url5",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url1",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Url2",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Url3",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Url4",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Url5",
                table: "Hotel");
        }
    }
}
