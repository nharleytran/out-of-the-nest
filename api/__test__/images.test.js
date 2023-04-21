const path = require('path');
function checkFileType(file, cb) {
    // https://youtu.be/9Qzmri1WaaE?t=1515
    // define a regex that includes the file types we accept
    const filetypes = /jpeg|jpg|png|gif/;
    //check the file extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // more importantly, check the mimetype
    const mimetype = filetypes.test(file.mimetype);
    // if both are good then continue
    if (mimetype && extname) return cb(null, true);
    // otherwise, return error message
    cb('filetype');
  }
describe('checkFileType', () => {
    it('should return true for valid file types', () => {
      const file = {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg'
      };
      const cb = jest.fn();
      checkFileType(file, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });
  
    it('should return an error message for invalid file types', () => {
      const file = {
        originalname: 'test.pdf',
        mimetype: 'application/pdf'
      };
      const cb = jest.fn();
      checkFileType(file, cb);
      expect(cb).toHaveBeenCalledWith('filetype');
    });
});
  