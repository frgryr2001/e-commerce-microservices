auth: port 3000
orders: port 3001
products: prot 3002

cài node module: 
cd backend
npm run install-all

chạy tất cả service:
cd backend
npm start


cài đặt erlang, rabbitmq

rabbitmq:
truy cập http://localhost:15672/
tk: guest
mk: guest
nếu không được
mở rabbitmq command prompt 
chạy lệnh: rabbitmq-plugins enable rabbitmq_management 


truy cập localhost:15672


chạy = docker:
cd backend
docker run -p 5672:5672 rabbitMQ

nếu chưa build container thì chạy lệnh:

docker-compose up --build

## service:

### auth:
	- users
	- admin
### product:
	- products
	- option_product
	- vouchers: code, expired.
	- ware_house
	- categories
	- 
### orders:
	- orders
front:
- a.com
client:
	trang chủ
	- dashboard khách hàng
- b.com
admin: 
	- dashboard admin

## GHN API:
- token: 84516f27-5f78-11ed-bae6-52e24d27983f
- shopid: 120614 - 0927055639