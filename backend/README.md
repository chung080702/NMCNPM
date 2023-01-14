# cách chạy backend
 - Chạy backend trước frontend
 - Cần tải mySQL, nhớ mật khẩu root.
 - Mở mySQL workbench, tạo database (schema) đặt tên là nmcnpm, charset để kiểu utf8, utf8-unicode-ci
 - Sửa trong file src\main\resources\application.properties mật khẩu bên trên
 - Mở terminal trong vscode gõ: mvn install 
 - Sau đó gõ: mvn spring-boot:run
 - Trước khi chạy frontend cần mở postman để đăng ký 1 tài khoản bằng link api bên dưới
# link MockAPI
https://docs.google.com/spreadsheets/d/11W6xg6QAmJZ4rUSl85EwO72960DvIt0dpNvq2EJNzPI/edit#gid=0
