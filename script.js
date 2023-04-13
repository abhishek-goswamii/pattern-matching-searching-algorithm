class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }

    search(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isEndOfWord;
    }

    suggestions(prefix) {
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!current.children[char]) {
                return [];
            }
            current = current.children[char];
        }
        return this.getAllWords(current, prefix);
    }

    getAllWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            results = results.concat(this.getAllWords(node.children[char], prefix + char));
        }
        return results;
    }
}



const wordList = {
    "apple": 'heh',
    "banana": true,
    "cherry": true,
    "date": true,
    "elderberry": true,
    "fig": true,
    "grape": true,
    "honeydew": true,
    "kiwi": true,
    "lemon": true,
    "mango": true,
    "orange": true,
    "pear": true,
    "quince": true,
    "raspberry": true,
    "strawberry": true,
    "tangerine": true,
    "ugli": true,
    "watermelon": true,
};





const trie = new Trie();
for (let word in wordList) {
    trie.insert(word);
}


const inputField = document.getElementById("input-field");
const suggestionsList = document.getElementById("suggestions-list");

inputField.addEventListener("input", () => {
  const prefix = inputField.value;
  const suggestions = trie.suggestions(prefix);
  suggestionsList.innerHTML = "";
  for (let i = 0; i < suggestions.length; i++) {
    const suggestion = suggestions[i];
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  }
});

