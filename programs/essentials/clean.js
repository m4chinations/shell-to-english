module.exports = function(str) {
    return str.trim().replace(/\s\s+/g, ' ').replace(/\s,/g, ',');
};
