module.exports = function(sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
        title:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review: 
        {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: 
        {
            type: DataTypes.STRING,
            defaultValue: "Other"
        },
    });
    return Reviews;
}