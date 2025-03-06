const { sequelize } = require("./models"); // Adjust path if needed

const testQuery = async () => {
    try {
        console.log("🔄 Testing database connection...");
        const [results, metadata] = await sequelize.query("SELECT * FROM dbo.Products");

        console.log("✅ Query executed successfully!");
        console.log(results); // Logs the results

        process.exit(0); // Exit process after completion
    } catch (error) {
        console.error("❌ Raw query error:", error);
        process.exit(1); // Exit with error
    }
};

// Run the test function
testQuery();
