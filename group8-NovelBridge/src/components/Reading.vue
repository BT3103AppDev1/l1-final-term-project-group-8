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
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";

export default {
    props: {
        name : String,
        chapter: Number
    },
    data() {
      return {
        curr_chapter: '',
        bookName: '',
        chapters_list: [],
        chapter_num: 1,
        chapter_data: ''
      }
    },
    created(){
        if (this.$route.params.name) {
            this.bookName = this.$route.params.name;
            console.log(this.bookName);
            console.log("tryout");
            this.bookId = this.$route.params.bookId;
        // continue with Firebase logic...
        } else {
        console.error('Route parameters are missing');
        }
        //this.userId = firebase.auth().currentUser.uid; 
        this.chapter_num = 1//this.$route.params.chapter;
        const storage = getStorage(firebaseApp);
        const novelsRef= storageRef(storage, '/Novels/' + this.bookName);

        listAll(novelsRef).then((result) => {
            this.files = result.items.filter((item) => item.name.endsWith(".txt"));
            // Since these are methods, they should be called with 'this.'
            this.selectChapter();
            this.getChapterData();
            });
        },
        

        /*storageRef.listAll().then((result) => {
            this.files = result.items.filter((item) => item.name.endsWith(".txt"));
        });
        selectChapter();
        getChapterData();
    },*/

    methods: {
        selectChapter(){
            for (i in this.chapters_list) {
                const ch = 'Chapter ' + this.chapter.toString();
                if (i.endsWith(ch)) {
                    this.curr_chapter = i
                    break;
                }
            }
        },
        getChapterData(){
            this.chapter_data = '';
            const storage = getStorage(firebaseApp);
            const chaptersRef = storageRef(storage, `Novels/${this.bookName}`);
            listAll(chaptersRef).then((result) => {
            const chapterFileRef = result.items.find((itemRef) => {
            return itemRef.name.includes(`Chapter ${this.chapter_num}`);
            });
            if (chapterFileRef) {
                // If the chapter file is found, get its download URL and fetch its content
                getDownloadURL(chapterFileRef).then((url) => {
                fetch(url)
                .then((response) => response.text())
                .then((text) => {
                    this.chapter_data = text;
                })
                .catch((error) => {
                    console.error("Error fetching file content:", error);
                });
                });
            } else {
                console.error(`No file found for Chapter ${this.chapter_num}`);
            }
            }).catch((error) => {
            console.error("Error listing chapter files:", error);
            });
        },
        /** 
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
        
        ifFirstChapter(){
            if (this.chapter_num == 1) {
                document.getElementById('gotoprevious').style.backgroundColor = "#808080"
            }
        },

        ifLastChapter(){
            if (this.chapter_num == keys[len(keys)]) {
                document.getElementById('gotonext').style.backgroundColor = "#808080"
            }
        },
        */

        
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
        },
        
    },
    async mounted() {
        this.ifFirstChapter()
        this.ifLastChapter()


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
    font-size: 16px;
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
.button{
    text-align: center;
    padding: 40px;
    margin: auto;
}

</style>