using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Food.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5ecbf673-fe65-4fa7-b1c2-cd7f05fdadba");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f27cadd7-ffa1-4e04-906a-fa661020f622");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fddc684f-2734-411d-bb5a-55d835e34b48");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "09e3c6c7-264a-43a1-ab17-ba7a2fb498a1", null, "OWNER", "OWNER" },
                    { "26bb343e-aaf0-436f-b410-c5f8efe5802b", null, "ADMIN", "ADMIN" },
                    { "3072fd7d-087f-411d-a587-b2d7436f01e5", null, "CUSTOMER", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "09e3c6c7-264a-43a1-ab17-ba7a2fb498a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26bb343e-aaf0-436f-b410-c5f8efe5802b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3072fd7d-087f-411d-a587-b2d7436f01e5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5ecbf673-fe65-4fa7-b1c2-cd7f05fdadba", null, "CUSTOMER", "CUSTOMER" },
                    { "f27cadd7-ffa1-4e04-906a-fa661020f622", null, "OWNER", "OWNER" },
                    { "fddc684f-2734-411d-bb5a-55d835e34b48", null, "ADMIN", "ADMIN" }
                });
        }
    }
}
