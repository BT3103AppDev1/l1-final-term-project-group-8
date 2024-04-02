<template>

    <div id="left_pane">
        <!-- for advertizing -->
    </div>

    <div id="reading pane">
        <button id="gotohome" @click="goToHome">< {{bookName}}</button>
        <h1>{{ chapter }}</h1>
        <div id="text">
            {{ chapter_data }}
        </div>
        <div id="footer pane">
        <!-- for the previous and next button -->
            <button id="gotoprevious" @click="goToPreviousChapter">Previous</button>

            <button id="gotonext" @click="goToNextChapter">Next</button>
    </div>
    </div>

    <div id="right_pane">
        <!-- for utility buttons -->
    </div>

</template>

<script>

import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc , deleteDoc } from 'firebase/firestore';



export default {
    props: ['bookName'],
    data() {
        return {
            all_chapters: getChapters(bookName),
            keys: all_chapters.getKeys(),
            chapter: keys[0],
            chapter_data: all_chapters[chapter]
        }
    }, 
    methods: {
        async getChapters(bookN) {
            const db = getFirestore(firebaseApp);
            const book = await getDocs(collection(db, 'Books',bookN))
            let chapters = book.data().Chapters 
            return chapters

        },
        goToNextChapter(){
            for (let i=0;i<len(keys)-1;i++){
                if (chapter == keys[i]) {
                    chapter = keys[i+1]
                    chapter_data = all_chapters[chapter]
                }
            }
        },
        goToPreviousChapter(){
            for (let i=1;i<len(keys);i++){
                if (chapter == keys[i]) {
                    chapter = keys[i-1]
                    chapter_data = all_chapters[chapter]
                }
            }
        },
        goToBookInfo(){
            //code to go back to the view with book info
        },
        translate(original, newL){
            //code to translate chapter data
        },
        increaseTextSize() {
            document.getElementById("text").style.fontSize = document.getElementById("text").style.fontSize + 1
        },
        decreaseTextSize() {
            document.getElementById("text").style.fontSize = document.getElementById("text").style.fontSize - 1
        }
    }
    
}

</script>

<style>
#left_pane,#rightpane,#reading_pane {
    width: 15%;
    height: 80%;
    float: left;
}
#reading_pane {
    text-align: center;
    background-color: #F4F2EC;
}
#gotohome{
    border: none;
    background-color: #F4F2EC;
    padding-left: 5px;
    text-align: center;
    font-size: 8px;
}
#text {
    text-align: center;
    padding: 5px 15px;
    font-size: 16px;

}

</style>