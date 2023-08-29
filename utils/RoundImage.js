// all images

import cod from "@/public/images/Hero_slider/cod.webp";
import fortnite from "@/public/images/Hero_slider/fortnite.webp";
import gta from "@/public/images/Hero_slider/gta.jpg";
import neogeogames from "@/public/images/Hero_slider/neogeogames.jpg";
import nitendo from "@/public/images/Hero_slider/nitendo.jpg";
import playstation from "@/public/images/Hero_slider/playstationgame.webp";
import pubg from "@/public/images/Hero_slider/pubg.jpg";
import sega from "@/public/images/Hero_slider/sega.webp";
import xbox from "@/public/images/Hero_slider/xbox.jpg";


//main node to set new node
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

//main linked list
class RoundList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            const tail = this.tail;
            this.tail = newNode;
            tail.next = newNode;
            this.tail.next = this.head;
        }
        this.length++
    }
}


//pushing image to RoundList
const imageList = new RoundList();
imageList.push(cod)
imageList.push(fortnite)
imageList.push(gta)
imageList.push(neogeogames)
imageList.push(nitendo)
imageList.push(playstation)
imageList.push(pubg)
imageList.push(sega)
imageList.push(xbox)

//export
module.exports = imageList;