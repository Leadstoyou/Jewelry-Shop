// import { MongoClient } from 'mongodb';

// const uri = 'mongodb+srv://dattthe161372:Abcdghik1@DatTT.5ga5mwv.mongodb.net/SDN301m_Project?retryWrites=true&w=majority';
// const dbName = 'SDN301m_Project';

// async function main() {
//   const client = new MongoClient(uri, { useNewUrlParser: false, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log('Kết nối thành công đến MongoDB');

//     const db = client.db(dbName);
//     const collection = db.collection('products');

//     const result = await collection.updateMany({ isDeleted: true }, { $set: { isDeleted: false } });
//     console.log(`${result.modifiedCount} bản ghi đã được cập nhật.`);
//   } catch (err) {
//     console.error('Lỗi khi thực hiện cập nhật:', err);
//   } finally {
//     client.close();
//   }
// }

// main().catch(console.error);

// import accountService from "./services/accountService.js";


// const data = {
//     productList:[{
//       productName:"vcl",
//       productImage:"vclamsdla",
//       productQuantity:"32",
//       productPrice:"3123123"
//     }],
//     userName:"huy oc cho",
//     userEmail:"dattthe161372@fpt.edu.vn",
//     userPhoneNumber:"09123313",
//     orderDate:"mung 1 thang 1 nam 2001"

// }

// const lmeo = await accountService.orderSendEmailService(data);
// console.log(lmeo);

// ok roi gio gan vao cai thanh toan di
