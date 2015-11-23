module.exports = function (dir) {
    if (dir == '..') {
        return "the parent directory";
    } else if (dir == '.') {
        return "the current directory";
    } else {
        if (dir.slice(-1) === '/') {
            return "the " + dir.slice(0, -1) + " directory";
        } else {
            return "the " + dir + " directory";
        }
    }
};
