import * as fs from 'fs';
import csv from 'csv-parser';


export async function readDataFromCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    /* We use a Promise because reading a file takes time (asynchronous).
So we return the data once the file is fully read. */
    const data: any[] = [];//Every time we read a row from the CSV, we will push it inside this array.
    /* 
        `fs.createReadStream(filePath)`: This line uses Node.js's fs module to create a 
        readable stream from the CSV file specified by the filePath.
    
        .`pipe(csv())`: This line pipes the readable stream through a CSV parser, 
        which parses the CSV data into JavaScript objects.
        Example:
CSV line: name,age becomes { name: "John", age: "25" } */

    fs.createReadStream(filePath)
      .pipe(csv())
      /* .on('data', (row) => { ... }): This event handler is called whenever a new row of data 
      is parsed from the CSV. It pushes each row into the data array. */
      .on('data', (row) => {
        data.push(row);
      })

      /* .on('end', () => { ... }): This event handler is called when the end of 
      the CSV file is reached. It resolves the Promise with the data array,
      indicating that the operation is complete.
     */
      .on('end', () => {
        resolve(data);
      })

      /* .on('error', (error) => { ... }): This event handler is called 
      if an error occurs during reading or
      parsing the CSV file. It rejects the Promise with the error. */
      .on('error', (error) => {
        reject(error);
      });
  });
}


/* Notes :
Here is a **very simple beginner-friendly explanation** of your helper file.
Think of this as explaining to a fresher who is learning Node.js + Playwright + TypeScript basics.

---

# 🔰 Beginner-Friendly Explanation of the CSV Helper File

This file contains a **helper function** that reads a CSV file and returns the data inside it as an array of JavaScript objects.

### ✔ What the function does

* It takes a **CSV file path** as input.
* Reads the file **line by line**.
* Converts each line into a **JavaScript object**.
* Returns **all the rows** as an array.

---

## 🧩 Breaking down the code (super simple explanation)

### 1️⃣ Importing required modules

```ts
import * as fs from 'fs';
import csv from 'csv-parser';
```

* **fs** → Node.js module that helps us read/write files.
* **csv-parser** → A package that helps convert CSV content into objects.

---

## 2️⃣ Function: `readDataFromCSV`

```ts
export async function readDataFromCSV(filePath: string): Promise<any[]> {
```

* `filePath` → path of the CSV file you want to read.
* Returns a **Promise** that will eventually give an **array of rows**.

---

## 3️⃣ Creating a Promise

```ts
return new Promise((resolve, reject) => {
```

We use a Promise because reading a file takes time (asynchronous).
So we return the data **once the file is fully read**.

---

## 4️⃣ Creating an empty array to store all rows

```ts
const data: any[] = [];
```

Every time we read a row from the CSV, we will push it inside this array.

---

## 5️⃣ Reading the file using a stream

```ts
fs.createReadStream(filePath)
```

* Think of this as reading the CSV **slowly**, line by line.
* Useful for big files so Node does not crash.

---

## 6️⃣ Passing the file through a CSV parser

```ts
.pipe(csv())
```

* This converts CSV lines into **JavaScript objects** automatically.
* Example:
  CSV line: `name,age` becomes `{ name: "John", age: "25" }`

---

## 7️⃣ Event: Reading each row

```ts
.on('data', (row) => {
  data.push(row);
})
```

* Every time a row is found → push it into the `data` array.
* Event name: `'data'` means **row received**.

---

## 8️⃣ Event: File reading completed

```ts
.on('end', () => {
  resolve(data);
})
```

* `'end'` event → all rows finished reading.
* Now we **resolve the Promise** with complete data.

So whoever calls this function will get:

```ts
[
  { name: "John", age: "25" },
  { name: "Sara", age: "30" }
]
```

---

## 9️⃣ Event: Handling errors

```ts
.on('error', (error) => {
  reject(error);
});
```

* If file is missing or corrupted → reject the Promise.
* Allows caller to catch errors with `try/catch`.

---

# 🎉 Final Summary

This function:

| Step | What Happens                                    |
| ---- | ----------------------------------------------- |
| 1    | Takes a CSV file path                           |
| 2    | Opens the file as a stream                      |
| 3    | Reads it line by line                           |
| 4    | Converts each line to an object                 |
| 5    | Pushes all rows into an array                   |
| 6    | Returns the array once file reading is complete |

---

# 👍 How you can use it

```ts
const users = await readDataFromCSV('./data.csv');
console.log(users);
```


 */