var Magician, exec;
exec = require("child_process").exec;
Magician = (function() {
  function Magician(sourcePath, destPath) {
    this.sourcePath = sourcePath;
    this.destPath = destPath;
  }
  Magician.prototype.resizeTo = function(width, height, callback) {
    if (!width || width < 0 || !height || height < 0) {
      return callback(new Error("width and height should be bigger than 0"));
    }
	var cmd="convert -resize " + width + "x" + height + " \"" + this.sourcePath + "\" \"" + this.destPath+'"';
//	console.log(cmd);
    return exec(cmd, function(err) {
      if (callback) {
        return callback(err);
      }
    });
  };
  Magician.prototype.cropFrom = function(x, y, width, height, callback) {
    if (x < 0 || y < 0 || width < 0 || height < 0) {
      return callback(new Error("x, y, width and height should be bigger than 0"));
    }
	var cmd="convert \"" + this.sourcePath + "\" -crop " + width + "x" + height + "+" + x + "+" + y + " \"" + this.destPath+'"';
//	console.log(cmd);
    return exec(cmd, function(err) {
      if (callback) {
        return callback(err);
      }
    });
  };
  Magician.prototype.convert = function(callback) {
	var cmd="convert \"" + this.sourcePath + "\" \"" + this.destPath+'"';
//	console.log(cmd);
    return exec(cmd, function(err) {
      if (callback) {
        return callback(err);
      }
    });
  };
  Magician.prototype.getDimensions = function(callback) {
    var that;
    that = this;
	var cmd="identify \"" + this.sourcePath+'"';
//	console.log(cmd);
    return exec(cmd, function(err, stdout) {
      var dimensions;
//      dimensions = stdout.split(" ")[2].split("x");
      dimensions = stdout.substr(that.sourcePath.length+1).split(" ")[1].split("x");
      that.width = dimensions[0];
      that.height = dimensions[1];
      if (callback) {
        return callback(err, {
          width: that.width,
          height: that.height
        });
      }
    });
  };
  return Magician;
})();
module.exports = Magician;