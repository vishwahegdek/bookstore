INSERT INTO Genres (genre_name)
VALUES
('Mystery'),
('Fantasy'),
('Science Fiction'),
('Romance'),
('Thriller'),
('Historical Fiction'),
('Self-Help');


INSERT INTO Books (title, author, price, genre_id)
VALUES
('The Girl with the Dragon Tattoo', 'Stieg Larsson', 999.99, 1),
('Gone Girl', 'Gillian Flynn', 1199.99, 1),
('The Da Vinci Code', 'Dan Brown', 899.99, 1),
('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 1999.99, 2),
('The Hobbit', 'J.R.R. Tolkien', 1599.99, 2),
('A Game of Thrones', 'George R.R. Martin', 1799.99, 2),
('Dune', 'Frank Herbert', 1699.99, 3),
('Ender\'s Game', 'Orson Scott Card', 1399.99, 3),
('Neuromancer', 'William Gibson', 1499.99, 3),
('Pride and Prejudice', 'Jane Austen', 1099.99, 4),
('The Fault in Our Stars', 'John Green', 1199.99, 4),
('Outlander', 'Diana Gabaldon', 1899.99, 4),
('The Silent Patient', 'Alex Michaelides', 1299.99, 5),
('The Girl on the Train', 'Paula Hawkins', 1399.99, 5),
('The Reversal', 'Michael Connelly', 1599.99, 5),
('All the Light We Cannot See', 'Anthony Doerr', 1699.99, 6),
('The Book Thief', 'Markus Zusak', 1499.99, 6),
('The Nightingale', 'Kristin Hannah', 1799.99, 6),
('The 7 Habits of Highly Effective People', 'Stephen R. Covey', 1599.99, 7),
('Atomic Habits', 'James Clear', 1399.99, 7),
('You Are a Badass', 'Jen Sincero', 1299.99, 7);

UPDATE Books
SET description = 'A gripping tale of mystery and suspense, as journalist Mikael Blomkvist teams up with the enigmatic hacker Lisbeth Salander to solve a decades-old disappearance case. Their investigation delves into the dark underbelly of Swedish society, uncovering secrets that powerful individuals would rather keep hidden.'
WHERE title = 'The Girl with the Dragon Tattoo';

UPDATE Books
SET description = 'On their fifth wedding anniversary, Nick Dunne''s wife Amy goes missing under suspicious circumstances. As the media circus and police investigation unfold, shocking secrets are revealed about their marriage, leading to a thrilling and twisted journey of deceit, betrayal, and manipulation.'
WHERE title = 'Gone Girl';

UPDATE Books
SET description = 'A gripping mystery that intertwines art, religion, and history, as Harvard symbologist Robert Langdon and cryptologist Sophie Neveu race against time to solve a murder and unravel a centuries-old conspiracy. Their quest takes them across Europe, following a trail of clues hidden in the works of Leonardo da Vinci.'
WHERE title = 'The Da Vinci Code';

UPDATE Books
SET description = 'The magical journey of Harry Potter begins when he discovers he is a wizard and is accepted into Hogwarts School of Witchcraft and Wizardry. Alongside his friends Ron and Hermione, Harry faces challenges, uncovers secrets, and confronts the dark wizard who killed his parents.'
WHERE title = 'Harry Potter and the Sorcerer''s Stone';

-- Repeat the above update statement for each book, providing its respective description.

UPDATE Books
SET description = 'Bilbo Baggins, a hobbit of the Shire, is unexpectedly swept into an adventure by the wizard Gandalf and a group of dwarves seeking to reclaim their homeland from the dragon Smaug. Along the way, Bilbo encounters trolls, goblins, and elves, as well as the mysterious creature Gollum and his precious ring.'
WHERE title = 'The Hobbit';

UPDATE Books
SET description = 'In the Seven Kingdoms of Westeros, noble families vie for power and control of the Iron Throne. As alliances are forged and broken, and betrayals abound, the realm is plunged into a deadly game of politics and intrigue, with dire consequences for those caught in the crossfire.'
WHERE title = 'A Game of Thrones';

UPDATE Books
SET description = 'Set in a distant future where noble houses vie for control of the desert planet Arrakis, known for its valuable spice melange. Young Paul Atreides becomes embroiled in a power struggle that will shape the fate of the galaxy, as he navigates treacherous politics and confronts his destiny as the prophesied messiah.'
WHERE title = 'Dune';

UPDATE Books
SET description = 'Earth is under threat from an alien race known as the Formics, and gifted children are trained in a battle school to become commanders in the war effort. Among them is Andrew "Ender" Wiggin, a brilliant strategist whose unique abilities make him humanity''s last hope for survival.'
WHERE title = 'Ender''s Game';

UPDATE Books
SET description = 'Set in a dystopian future where cyberspace and artificial intelligence dominate, washed-up computer hacker Case is hired by a mysterious employer for one last job. As he navigates a world of virtual reality and corporate espionage, Case uncovers a conspiracy that could change the course of human evolution.'
WHERE title = 'Neuromancer';

UPDATE Books
SET description = 'The classic tale of manners and marriage in early 19th-century England, as the spirited Elizabeth Bennet navigates the complexities of love and society. Alongside her sisters, Elizabeth encounters a cast of colorful characters, including the brooding Mr. Darcy, in a story of wit, romance, and social commentary.'
WHERE title = 'Pride and Prejudice';

UPDATE Books
SET description = 'Hazel Grace Lancaster, a teenage cancer patient, meets and falls in love with Augustus Waters at a support group. Together, they embark on a journey to Amsterdam to meet Hazel''s favorite author, grappling with love, loss, and the complexities of life in the face of illness.'
WHERE title = 'The Fault in Our Stars';

UPDATE Books
SET description = 'Claire Randall, a World War II nurse, is transported back in time to 18th-century Scotland, where she becomes entangled in the Jacobite risings and falls in love with the dashing Highlander Jamie Fraser. Amidst political intrigue and danger, Claire must navigate the challenges of two different worlds and fight for her future.'
WHERE title = 'Outlander';

UPDATE Books
SET description = 'Alicia Berenson, a famous painter, is accused of murdering her husband and has remained silent ever since. Psychotherapist Theo Faber is determined to unravel the mystery behind Alicia''s silence, delving into her past and uncovering shocking truths that will change everything.'
WHERE title = 'The Silent Patient';

UPDATE Books
SET description = 'Rachel Watson, an alcoholic divorcee, becomes obsessed with a seemingly perfect couple she observes from the train every day. When the woman goes missing, Rachel becomes entangled in the investigation, confronting her own demons and uncovering dark secrets.'
WHERE title = 'The Girl on the Train';

UPDATE Books
SET description = 'Defense attorney Mickey Haller is recruited by the prosecution to handle the retrial of a convicted child molester, with the help of his ex-wife and prosecutor Maggie McPherson. As they navigate the complexities of the legal system, they uncover evidence that challenges everything they thought they knew about the case.'
WHERE title = 'The Reversal';

UPDATE Books
SET description = 'Set during World War II, the novel follows the parallel lives of a blind French girl, Marie-Laure, and a German orphan boy, Werner, whose paths eventually cross in occupied France. Their stories intertwine amidst the chaos of war, as they struggle to survive and find hope in the midst of darkness.'
WHERE title = 'All the Light We Cannot See';

UPDATE Books
SET description = 'Narrated by Death, the story follows Liesel Meminger, a young girl living in Nazi Germany, who steals books and shares them with her neighbors and the Jewish man hiding in her basement. Through the power of words, Liesel learns about love, friendship, and the resilience of the human spirit in the face of oppression.'
WHERE title = 'The Book Thief';

UPDATE Books
SET description = 'Set in France during World War II, the novel tells the story of two sisters, Vianne and Isabelle, who navigate the horrors of war in their own ways. As they confront danger, loss, and sacrifice, they find strength in each other and in the bonds of sisterhood.'
WHERE title = 'The Nightingale';

UPDATE Books
SET description = 'A self-help book that outlines seven principles for personal and professional success, focusing on developing habits that lead to effectiveness and fulfillment. Author Stephen R. Covey emphasizes proactive behavior, personal growth, and principles-centered living as keys to achieving one''s goals.'
WHERE title = 'The 7 Habits of Highly Effective People';

UPDATE Books
SET description = 'In this transformative book, author James Clear explores the power of tiny changes, or "atomic habits," in building better habits and breaking bad ones. Through practical strategies and scientific insights, Clear offers a roadmap for creating lasting change and achieving remarkable results in every area of life.'
WHERE title = 'Atomic Habits';

UPDATE Books
SET description = 'Jen Sincero delivers a witty and irreverent guide to personal development, encouraging readers to embrace their inner badass and live life on their own terms. With humor and insight, Sincero offers practical advice and exercises to help readers overcome self-doubt, cultivate self-love, and unleash their full potential.'
WHERE title = 'You Are a Badass';

INSERT INTO Admin(admin_email,password_hash) VALUES('admin@gmail.com','admin@123')