// Dependency-free ZIP packaging, usable on Windows, macOS and Linux.
import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const files=[];
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);if(item.isDirectory())await walk(path);else files.push([path.slice(5).replaceAll('\\','/'),await readFile(path)]);}}
await walk('dist');
files.push(['START-HERE.txt',Buffer.from('loveAI Survivors\n\nServe this folder with any static web server.\nWith Node.js installed, open a terminal here and run:\n  npx serve .\nThen open the printed local address. Do not double-click index.html.\n\nFor website hosting, upload this folder contents to /survivors/\nand open that URL with its trailing slash. No backend is required.\n')]);
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
const crc=bytes=>{let n=0xffffffff;for(const b of bytes)n=table[(n^b)&255]^(n>>>8);return (n^0xffffffff)>>>0;};
const chunks=[],directory=[];let offset=0;
for(const [name,data] of files){const filename=Buffer.from(name),sum=crc(data),local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x800,6);local.writeUInt16LE(33,12);local.writeUInt32LE(sum,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(filename.length,26);chunks.push(local,filename,data);const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);central.writeUInt16LE(33,14);central.writeUInt32LE(sum,16);central.writeUInt32LE(data.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(filename.length,28);central.writeUInt32LE(offset,42);directory.push(central,filename);offset+=local.length+filename.length+data.length;}
const central=Buffer.concat(directory),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(offset,16);
await mkdir('releases',{recursive:true});await writeFile('releases/loveai-survivors.zip',Buffer.concat([...chunks,central,end]));console.log(`Packaged ${files.length} files in releases/loveai-survivors.zip`);
