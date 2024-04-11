# files/content.js
Tạo tập tin nội dung với cấu trúc
_board_content = {
    modules: "icdtV2",
    screen: this._screen.get,
    data: this._data.get,
    resources: this._data.getResource,
    variable: this._variable.get,
    info: {}
}

Xuất nội dung định dạng ZIP từ hệ thống và giải nén vào thư mục files này, 
sửa file content.json thành content.js, sau đó bổ sung đoạn khai báo "_board_content = { ... }" vào file này theo định dạng trên là chạy được.

# build bundle
$ npm install

$ npm run webpack
hoặc
$ npx webpack --config webpack.config.js --mode=production
