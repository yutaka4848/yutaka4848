--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    distance_in_light_years integer,
    galaxy_types character varying(30)
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    planet_id integer,
    diameter integer,
    mass_rel_planet numeric,
    age_in_billions_of_years integer,
    has_life boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    has_life boolean,
    galaxy_id integer,
    diameter integer,
    planet_types character varying(30),
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: space_telescope; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.space_telescope (
    space_telescope_id integer NOT NULL,
    name character varying(30) NOT NULL,
    ray_types character varying(30)
);


ALTER TABLE public.space_telescope OWNER TO freecodecamp;

--
-- Name: space_telescope_scope_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.space_telescope_scope_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.space_telescope_scope_id_seq OWNER TO freecodecamp;

--
-- Name: space_telescope_scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.space_telescope_scope_id_seq OWNED BY public.space_telescope.space_telescope_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    galaxy_id integer,
    diameter integer,
    star_types character varying(30)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_id_seq OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_id_seq'::regclass);


--
-- Name: space_telescope space_telescope_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.space_telescope ALTER COLUMN space_telescope_id SET DEFAULT nextval('public.space_telescope_scope_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way Galaxy', NULL, 100000, 'SBc');
INSERT INTO public.galaxy VALUES (2, 'Large Magellanic Cloud', NULL, 163000, 'SB(s)m');
INSERT INTO public.galaxy VALUES (3, 'Andromeda Galaxy', NULL, 2500000, 'SA(s)b');
INSERT INTO public.galaxy VALUES (4, 'Small Magellanic Cloude', NULL, 190000, 'SB(s)m');
INSERT INTO public.galaxy VALUES (5, 'NGC6822', NULL, 1800000, 'lB(s)m');
INSERT INTO public.galaxy VALUES (6, 'NGC185', NULL, 2350000, 'dE3');
INSERT INTO public.galaxy VALUES (7, 'Canis Major Overdensity', NULL, NULL, NULL);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', NULL, 1, 3474, 0.0123, 1, false);
INSERT INTO public.moon VALUES (2, 'Titan', 'mass is x10e21', 6, 5149, 135, 0, false);
INSERT INTO public.moon VALUES (3, 'Rhea', 'mass is x10e21', 6, 1527, 2.3, 0, false);
INSERT INTO public.moon VALUES (4, 'Iapetus', 'mass is x10e21', 6, 1470, 1.8, 0, false);
INSERT INTO public.moon VALUES (5, 'Dione', 'mass is x10e21', 6, 1123, 1.1, 0, false);
INSERT INTO public.moon VALUES (6, 'Tethys', 'mass is x10e21', 6, 1062, 0.62, 0, false);
INSERT INTO public.moon VALUES (7, 'Enceladus', 'mass is x10e21', 6, 504, 0.11, 0, false);
INSERT INTO public.moon VALUES (8, 'Mimas', 'mass is x10e21', 6, 396, 0.04, 0, false);
INSERT INTO public.moon VALUES (9, 'Ariel', 'mass is x10e21', 7, 1158, 1.35, NULL, NULL);
INSERT INTO public.moon VALUES (10, 'Umbriel', 'mass is x10e21', 7, 1169, 1.17, NULL, NULL);
INSERT INTO public.moon VALUES (11, 'Titania', 'mass is x10e21', 7, 1578, 3.53, NULL, NULL);
INSERT INTO public.moon VALUES (12, 'Oberon', 'mass is x10e21', 7, 1523, 3.01, NULL, NULL);
INSERT INTO public.moon VALUES (13, 'Miranda', 'mass is x10e21', 7, 472, 0.066, NULL, NULL);
INSERT INTO public.moon VALUES (14, 'Io', 'mass is x10e21', 5, 3643, 89, NULL, NULL);
INSERT INTO public.moon VALUES (15, 'Europa', 'mass is x10e21', 5, 3122, 48, NULL, NULL);
INSERT INTO public.moon VALUES (16, 'Ganymede', 'mass is x10e21', 5, 5262, 150, NULL, NULL);
INSERT INTO public.moon VALUES (17, 'Callisto', 'mass is x10e21', 5, 4821, 110, NULL, NULL);
INSERT INTO public.moon VALUES (18, 'Metis', 'mass is x10e21', 5, 43, 0.00012, NULL, NULL);
INSERT INTO public.moon VALUES (19, 'Phobos', 'mass is x10e21', 2, 22, 0.0000108, NULL, NULL);
INSERT INTO public.moon VALUES (20, 'Deimos', 'mass is x10e21', 2, 13, 0.000006, NULL, NULL);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (2, 'Mars', NULL, false, 1, 6794, 'Earthly', 1);
INSERT INTO public.planet VALUES (3, 'Venus', NULL, false, 1, 12103, 'Earthly', 1);
INSERT INTO public.planet VALUES (1, 'Earth', NULL, true, 1, 6357, 'Earthly', 1);
INSERT INTO public.planet VALUES (4, 'Mercury', NULL, false, 1, 4879, 'Earthly', 1);
INSERT INTO public.planet VALUES (5, 'Jupiter', NULL, false, 1, 142984, 'Jovian', 1);
INSERT INTO public.planet VALUES (6, 'Saturn', NULL, false, 1, 120536, 'Jovian', 1);
INSERT INTO public.planet VALUES (7, 'Uranus', NULL, false, 1, 51118, 'Ice Giant', 1);
INSERT INTO public.planet VALUES (8, 'Neptune', NULL, false, 1, 24622, 'Ice Giant', 1);
INSERT INTO public.planet VALUES (9, 'Plute', 'dwarf planet', NULL, 1, 2390, 'Plutonian', 1);
INSERT INTO public.planet VALUES (10, 'Eris', 'dwarf planet', NULL, 1, 2400, 'Plutonian', 1);
INSERT INTO public.planet VALUES (11, 'Makemake', 'dwarf planet', NULL, 1, 1430, 'Plutonian', 1);
INSERT INTO public.planet VALUES (12, 'Haumea', 'dwarf planet', NULL, 1, 1518, 'Plutonian', 1);


--
-- Data for Name: space_telescope; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.space_telescope VALUES (1, 'Hubble Space Telescope', 'visiible light');
INSERT INTO public.space_telescope VALUES (2, 'GLAST', 'gamma ray');
INSERT INTO public.space_telescope VALUES (3, 'AGILE', 'gamma ray, X ray');
INSERT INTO public.space_telescope VALUES (4, 'Astrosat', 'X ray, ultraviolet');
INSERT INTO public.space_telescope VALUES (5, 'JWST', 'infrared');


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', NULL, 1, 695510, 'G2V');
INSERT INTO public.star VALUES (3, 'Alpha Centauri B', NULL, 1, 597513, 'K1V');
INSERT INTO public.star VALUES (4, 'Proxima Centauri', NULL, 1, 107248, 'M5.5Ve');
INSERT INTO public.star VALUES (2, 'Alpha Centauri A', NULL, 1, 853391, 'G2V');
INSERT INTO public.star VALUES (6, 'Sirius', NULL, 1, 2, 'A0mA1 Va');
INSERT INTO public.star VALUES (5, 'Barnard`s Star', NULL, 1, 0, 'M4V');
INSERT INTO public.star VALUES (7, 'Canopus', NULL, 1, 71, 'A9 II');


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 1, false);


--
-- Name: moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_id_seq', 1, false);


--
-- Name: planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_id_seq', 1, true);


--
-- Name: space_telescope_scope_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.space_telescope_scope_id_seq', 1, false);


--
-- Name: star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_id_seq', 1, false);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: space_telescope space_telescope_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.space_telescope
    ADD CONSTRAINT space_telescope_pkey PRIMARY KEY (space_telescope_id);


--
-- Name: space_telescope space_telescope_scope_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.space_telescope
    ADD CONSTRAINT space_telescope_scope_id_key UNIQUE (space_telescope_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

