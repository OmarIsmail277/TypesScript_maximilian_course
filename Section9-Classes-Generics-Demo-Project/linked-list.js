"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}
// class LinkedList<T> {
//   private root?: ListNode<T>;
//   private tail?: ListNode<T>;
//   private length = 0;
//   add(value: T) {
//     const node = new ListNode(value);
//     if (!this.root) {
//       this.root = node;
//     } else {
//       let current = this.root;
//       while (current.next) {
//         current = current.next;
//       }
//       current.next = node;
//     }
//     this.length++;
//   }
// }
class LinkedList {
    root;
    tail;
    length = 0;
    add(value) {
        const node = new ListNode(value);
        if (!this.root || !this.tail) {
            this.root = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    getNumberOfElements() {
        return this.length;
    }
    print() {
        let current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}
const numberList = new LinkedList();
numberList.add(10);
numberList.add(5);
numberList.add(-3);
console.log(numberList.getNumberOfElements());
numberList.print();
const nameList = new LinkedList();
//# sourceMappingURL=linked-list.js.map