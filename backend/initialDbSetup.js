import { connection, query } from "./databaseConnection.js";

export async function createDatabase() {
  try {
    const queryStr = "CREATE DATABASE movie_db;USE movie_db";
    const response = await query(queryStr);
  } catch (error) {
    console.log(error);
  }
}

export async function createTables() {
  if (await isAllTableExists()) {
    const queryStr = "USE movie_db";
    const response = await query(queryStr);
    return;
  } else {
    const databaseManagers =
      "CREATE TABLE Database_Managers(username VARCHAR(30) NOT NULL,password VARCHAR(30) NOT NULL,PRIMARY KEY(username));";
    const audience =
      "CREATE TABLE Audience(username VARCHAR(30),password VARCHAR(30) NOT NULL,name VARCHAR(30) NOT NULL,surname VARCHAR(30) NOT NULL,\
        PRIMARY KEY(username));";
    const rating_platform =
      "CREATE TABLE Rating_Platform(platform_id INTEGER,platform_name VARCHAR(30) UNIQUE NOT NULL,PRIMARY KEY(platform_id));";
    const directors =
      "CREATE TABLE Directors(username VARCHAR(30),password VARCHAR(30) NOT NULL,name VARCHAR(30) NOT NULL,surname VARCHAR(30) NOT NULL,\
nationality VARCHAR(30) NOT NULL,\
platform_id INTEGER,\
PRIMARY KEY(username),\
FOREIGN KEY(platform_id) REFERENCES Rating_Platform(platform_id) ON DELETE SET NULL ON UPDATE SET NULL);";
    const subscribed =
      "CREATE TABLE Subscribed(\
username VARCHAR(30) NOT NULL,\
platform_id INTEGER NOT NULL,\
PRIMARY KEY(username,platform_id),\
FOREIGN KEY(username) REFERENCES Audience(username) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(platform_id) REFERENCES Rating_Platform(platform_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    const genres =
      "CREATE TABLE Genres(genre_id INTEGER,genre_name VARCHAR(30) UNIQUE NOT NULL,PRIMARY KEY(genre_id));";
    const movies =
      "CREATE TABLE Movies(\
movie_id INTEGER,\
movie_name VARCHAR(30) NOT NULL,\
duration INTEGER NOT NULL,\
director VARCHAR(30) NOT NULL,\
average_rating FLOAT CHECK(average_rating BETWEEN 0 AND 5) DEFAULT 0,\
PRIMARY KEY(movie_id),\
FOREIGN KEY(director) REFERENCES Directors(username) ON DELETE CASCADE ON UPDATE CASCADE);";
    const ratings =
      "CREATE TABLE Ratings(\
username VARCHAR(30) NOT NULL,\
movie_id INTEGER NOT NULL,\
rating FLOAT CHECK(rating BETWEEN 0 AND 5) NOT NULL,\
PRIMARY KEY(username,movie_id),\
FOREIGN KEY(username) REFERENCES Audience(username) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    const type_of =
      "CREATE TABLE Type_Of(\
movie_id INTEGER NOT NULL,\
genre_id INTEGER NOT NULL,\
PRIMARY KEY(genre_id,movie_id),\
FOREIGN KEY(movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    const predecessor =
      "CREATE TABLE Predecessor(\
successor_id INTEGER NOT NULL,\
predecessor_id INTEGER NOT NULL,\
PRIMARY KEY(successor_id,predecessor_id),\
FOREIGN KEY(successor_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(predecessor_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    const theatres =
      "CREATE TABLE Theatres(\
theatre_id INTEGER,\
theatre_name VARCHAR(30) NOT NULL,\
theatre_district VARCHAR(30) NOT NULL,\
theatre_capacity INTEGER NOT NULL,\
PRIMARY KEY(theatre_id));";
    const movie_sessions =
      "CREATE TABLE Movie_Sessions(\
session_id INTEGER,\
movie_id INTEGER NOT NULL,\
theatre_id INTEGER NOT NULL,\
time_slot ENUM('1','2','3','4') NOT NULL,\
date DATE,\
PRIMARY KEY(session_id),\
FOREIGN KEY(movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(theatre_id) REFERENCES Theatres(theatre_id) ON DELETE CASCADE ON UPDATE CASCADE,\
UNIQUE(session_id,theatre_id));";
    const bought =
      "CREATE TABLE Bought(\
username VARCHAR(30) NOT NULL,\
session_id INTEGER NOT NULL,\
PRIMARY KEY(username,session_id),\
FOREIGN KEY(username) REFERENCES Audience(username) ON DELETE CASCADE ON UPDATE CASCADE,\
FOREIGN KEY(session_id) REFERENCES Movie_Sessions(session_id) ON DELETE CASCADE ON UPDATE CASCADE);";
    const taken_slots =
      "CREATE TABLE Taken_Slots(\
theatre_id INTEGER NOT NULL,\
slot ENUM('1','2','3','4')  NOT NULL,\
date DATE,\
PRIMARY KEY(theatre_id,slot,date),\
FOREIGN KEY(theatre_id) REFERENCES Theatres(theatre_id) ON DELETE CASCADE ON UPDATE CASCADE);";

    const queryStr =
      databaseManagers +
      audience +
      rating_platform +
      directors +
      subscribed +
      genres +
      movies +
      ratings +
      type_of +
      predecessor +
      theatres +
      movie_sessions +
      bought +
      taken_slots;
    try {
      const tableRes = await query(queryStr);
      const triggerRes = await createTriggers();
      const seed = await seedData();

      //console.log(tableRes);
      //console.log(triggerRes);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function isAllTableExists() {
  try {
    const tables = await query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'movie_db'`
    );
    //console.log(tables);
    if (tables.length == 14) {
      console.log("There are 14 tables.");
      //const showTriggers = await query("SHOW TRIGGERS FROM movie_db;");
      //console.log(showTriggers);
      return true;
    }
    await createDatabase();
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function seedData() {
  try {
    let queryText =
      "INSERT INTO Database_Managers(username,password) VALUES('manager1','managerpass1');\
INSERT INTO Database_Managers(username,password) VALUES('manager2','managerpass2');\
INSERT INTO Database_Managers(username,password) VALUES('manager35','managerpass35');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80001,'Animation');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80002,'Comedy');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80003,'Adventure');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80004,'Real Story');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80005,'Thriller');\
INSERT INTO Genres(genre_id,genre_name) VALUES(80006,'Drama');\
INSERT INTO Rating_Platform(platform_id,platform_name) VALUES(10130 ,'IMDB');\
INSERT INTO Rating_Platform(platform_id,platform_name) VALUES(10131 ,'Letterboxd');\
INSERT INTO Rating_Platform(platform_id,platform_name) VALUES(10132 ,'FilmIzle');\
INSERT INTO Rating_Platform(platform_id,platform_name) VALUES(10133 ,'Filmora');\
INSERT INTO Rating_Platform(platform_id,platform_name) VALUES(10134 ,'BollywoodMDB');";
    const response = await query(queryText);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function createTriggers() {
  const limit_database_managers =
    "CREATE TRIGGER Limit_The_Database_Managers\
  BEFORE INSERT\
 ON Database_Managers\
 FOR EACH ROW\
 BEGIN\
    DECLARE cnt INT;\
    SELECT count(*) INTO cnt FROM Database_Managers;\
    IF cnt = 4 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can store at most 4 database managers.';\
    END IF;\
END;";
  const is_eligible_to_add_director =
    "CREATE TRIGGER Is_Eligible_To_Add_Director \
  BEFORE INSERT \
 ON Directors\
 FOR EACH ROW\
 BEGIN\
    DECLARE is_exist INT;\
    SELECT COUNT(*) INTO is_exist FROM Audience WHERE username = new.username;\
    IF is_exist > 0 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is an audience with this username';\
    END IF;\
     INSERT INTO Audience (username,password,name,surname)\
     values\
     (new.username,new.password,new.name,new.surname);\
 END;";

  const change_average_rate_when_audience_deleted =
    "CREATE TRIGGER Change_Rating\
BEFORE DELETE\
ON Audience\
FOR EACH ROW\
BEGIN\
	DECLARE finished INTEGER DEFAULT 0;\
    DECLARE cur_movie_id INTEGER;\
    DECLARE sum_movie_rating FLOAT;\
    DECLARE rating_count INTEGER;\
    DECLARE curr_rating FLOAT;\
	DECLARE curs_rating CURSOR FOR SELECT movie_id FROM Ratings where username = old.username;\
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;\
    OPEN curs_rating;\
     change_rating: LOOP\
		FETCH curs_rating INTO cur_movie_id;\
		IF finished = 1 THEN \
			LEAVE change_rating;\
		END IF;\
        SELECT R.rating INTO curr_rating FROM Ratings AS R WHERE R.movie_id = cur_movie_id AND username = old.username;\
        SELECT SUM(R.rating) INTO sum_movie_rating FROM Ratings AS R WHERE R.movie_id = cur_movie_id;\
        SELECT COUNT(R.rating) INTO rating_count FROM Ratings AS R WHERE R.movie_id = cur_movie_id;\
        IF rating_count = 1 THEN \
			UPDATE Movies SET average_rating = null WHERE movie_id = cur_movie_id;\
		END IF;\
		IF rating_count >1 THEN \
			UPDATE Movies SET average_rating = ((sum_movie_rating - curr_rating) / (rating_count-1)) WHERE movie_id = cur_movie_id;\
		END IF;\
	END LOOP change_rating;\
    CLOSE curs_rating;\
END;";

  const is_eligible_to_rate =
    "CREATE TRIGGER Is_Eligible_To_Rate \
 BEFORE INSERT \
 ON Ratings\
 FOR EACH ROW\
 BEGIN\
    DECLARE movies_platform_id INT;\
    DECLARE is_subsribed_to_platform INT;\
    DECLARE is_bought_a_ticket INT;\
    SELECT D.platform_id INTO movies_platform_id FROM Directors AS D WHERE D.username = (SELECT M.director FROM Movies AS M  WHERE movie_id = new.movie_id);\
    SELECT COUNT(*) INTO is_subsribed_to_platform FROM Subscribed WHERE username=new.username AND platform_id=movies_platform_id;\
    SELECT COUNT(*) INTO is_bought_a_ticket FROM Bought AS B INNER JOIN Movie_Sessions AS S ON B.session_id = S.session_id WHERE B.username = new.username AND S.movie_id = new.movie_id;\
    IF is_subsribed_to_platform = 0 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The audience is not subsribed to platform of the movie';\
    END IF;\
     IF is_bought_a_ticket = 0 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The audience did not buy a ticket before of that movie';\
    END IF;\
 END;";
  const change_average_rating =
    "CREATE TRIGGER Change_Movie_Rating \
 AFTER INSERT \
 ON Ratings\
 FOR EACH ROW\
 BEGIN\
   DECLARE average_movie_rating FLOAT;\
   SELECT AVG(R.rating) INTO average_movie_rating FROM Ratings AS R WHERE R.movie_id = new.movie_id;\
   UPDATE Movies SET average_rating = average_movie_rating WHERE movie_id = new.movie_id;\
 END;";

  const slot_availability =
    "CREATE TRIGGER Check_Slot_Availability \
 BEFORE INSERT \
 ON Movie_Sessions\
 FOR EACH ROW\
 BEGIN\
   DECLARE movie_duration INT;\
   DECLARE is_slot_taken INT;\
   DECLARE curr_slot INT;\
   SELECT duration INTO movie_duration FROM Movies WHERE movie_id = new.movie_id;\
   SELECT COUNT(*) INTO is_slot_taken FROM Taken_Slots AS S WHERE new.time_slot <= S.slot AND (new.time_slot+movie_duration-1) >= S.slot AND S.theatre_id = new.theatre_id AND S.date = new.date;\
   IF is_slot_taken > 0 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The required slots are not empty.';\
   END IF;\
    IF new.time_slot + movie_duration > 5 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time slot exceeds 4';\
   END IF;\
   SET curr_slot = new.time_slot;\
   WHILE curr_slot < new.time_slot + movie_duration DO\
     INSERT INTO Taken_Slots (theatre_id,slot,date)\
     values\
     (new.theatre_id,curr_slot,new.date);\
     SET curr_slot=curr_slot+1;\
    END while ;\
 END;";

  const bought_availability =
    "CREATE TRIGGER Is_Eligible_To_Buy \
 BEFORE INSERT \
 ON Bought\
 FOR EACH ROW\
 BEGIN\
    DECLARE nbr_of_not_bought_films INT;\
    DECLARE theatre_capacity INT;\
    DECLARE current_capacity INT;\
    DECLARE id_of_the_movie INT;\
    DECLARE date_of_the_movie DATE;\
    DECLARE slot_of_the_movie INT;\
    SELECT COUNT(*) INTO current_capacity FROM Bought WHERE session_id = new.session_id;\
    SELECT S.date INTO date_of_the_movie FROM Movie_Sessions AS S INNER JOIN Bought AS B ON S.session_id = new.session_id LIMIT 1;\
    SELECT S.time_slot INTO slot_of_the_movie FROM Movie_Sessions AS S INNER JOIN Bought AS B ON S.session_id = new.session_id LIMIT 1;\
    SELECT DISTINCT T.theatre_capacity INTO theatre_capacity FROM Bought as B INNER JOIN Movie_Sessions AS S ON B.session_id = S.session_id INNER JOIN \
    Theatres AS T ON T.theatre_id = S.theatre_id;\
    SELECT S.movie_id INTO id_of_the_movie FROM Movie_Sessions AS S WHERE S.session_id = new.session_id;\
    SELECT COUNT(*) INTO nbr_of_not_bought_films FROM (SELECT predecessor_id FROM Predecessor WHERE successor_id = id_of_the_movie AND predecessor_id NOT IN \
    (SELECT S.movie_id FROM Movie_Sessions AS S INNER JOIN Bought AS B ON S.session_id = B.session_id WHERE B.username = new.username AND (date_of_the_movie > S.date OR (date_of_the_movie = S.date AND slot_of_the_movie > S.time_slot)))\
    ) AS Temp; \
     IF theatre_capacity = current_capacity THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The capacity is full';\
    END IF;\
    IF nbr_of_not_bought_films > 0 THEN\
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The audience first should buy the predessor movies of this movie';\
    END IF;\
 END;";

  const queryStr =
    limit_database_managers +
    is_eligible_to_rate +
    change_average_rating +
    slot_availability +
    bought_availability +
    is_eligible_to_add_director +
    change_average_rate_when_audience_deleted;
  try {
    console.log(queryStr);
    const res = await query(queryStr);
    return res;
  } catch (error) {
    console.log(error);
  }
}
