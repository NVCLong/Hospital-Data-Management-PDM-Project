module.exports = {
    multipleSQLToObject: function (mongooseArray) {
        return mongooseArray.map(function (course) {
            return course.toObject();
        });
    },
   SQLToObject: function (mongooses) {
        return mongooses.toObject();
    }
}