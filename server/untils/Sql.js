class Untils{
    multipleSQLToObject (SQLArray) {
        return SQLArray.map(function (SQL) {
            return SQL.toObject();
        });
    }
    SQLToObject(SQl) {
        return SQl.toObject();
    }
}

module.exports = new Untils();