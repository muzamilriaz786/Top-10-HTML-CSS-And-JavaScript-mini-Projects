// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');
const loader = document.getElementById('loader');

// Quotes array
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Do not watch the clock. Do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    }
];

// Show loading spinner
function showLoading() {
    loader.classList.add('active');
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
}

// Hide loading spinner
function hideLoading() {
    loader.classList.remove('active');
    quoteText.style.opacity = 1;
    quoteAuthor.style.opacity = 1;
}

// Get random quote
function getRandomQuote() {
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        // Update tweet button
        tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
        
        hideLoading();
    }, 500);
}

// Event listeners
newQuoteBtn.addEventListener('click', getRandomQuote);

// Load first quote
getRandomQuote();
