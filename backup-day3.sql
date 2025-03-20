--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-19 16:59:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 55333)
-- Name: master_doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_doctor (
    doctor_id integer NOT NULL,
    doctor_name_name character varying(255),
    address text,
    city character varying(100),
    country character varying(100),
    kategori character varying(50),
    contact_phone character varying(20)
);


ALTER TABLE public.master_doctor OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 55332)
-- Name: master_doctor_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_doctor_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_doctor_doctor_id_seq OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 217
-- Name: master_doctor_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_doctor_doctor_id_seq OWNED BY public.master_doctor.doctor_id;


--
-- TOC entry 220 (class 1259 OID 55342)
-- Name: master_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_service (
    service_id integer NOT NULL,
    service_name character varying(255),
    service_group character varying(100)
);


ALTER TABLE public.master_service OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 55349)
-- Name: master_service_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_service_category (
    service_category_id integer NOT NULL,
    category_name character varying(255)
);


ALTER TABLE public.master_service_category OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 55348)
-- Name: master_service_category_service_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_service_category_service_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_service_category_service_category_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 221
-- Name: master_service_category_service_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_service_category_service_category_id_seq OWNED BY public.master_service_category.service_category_id;


--
-- TOC entry 219 (class 1259 OID 55341)
-- Name: master_service_service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_service_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_service_service_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 219
-- Name: master_service_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_service_service_id_seq OWNED BY public.master_service.service_id;


--
-- TOC entry 224 (class 1259 OID 55356)
-- Name: master_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_user (
    id integer NOT NULL,
    username character varying(100),
    email character varying(255),
    hash_password text,
    ts_insert timestamp without time zone,
    status character(1)
);


ALTER TABLE public.master_user OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 55355)
-- Name: master_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_user_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 223
-- Name: master_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_user_id_seq OWNED BY public.master_user.id;


--
-- TOC entry 226 (class 1259 OID 55372)
-- Name: pricelists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pricelists (
    pricelist_id integer NOT NULL,
    service_id integer,
    service_category_id integer,
    price numeric(10,2)
);


ALTER TABLE public.pricelists OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 55371)
-- Name: pricelists_pricelist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pricelists_pricelist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pricelists_pricelist_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 225
-- Name: pricelists_pricelist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pricelists_pricelist_id_seq OWNED BY public.pricelists.pricelist_id;


--
-- TOC entry 227 (class 1259 OID 55378)
-- Name: transaction_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_details (
    transaction_id integer,
    service_id integer,
    service_category integer,
    quantity integer,
    price numeric(10,2),
    amount numeric(10,2)
);


ALTER TABLE public.transaction_details OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 55388)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    service_group character varying(50),
    doctor_id integer,
    patient_name character varying(50),
    transaction_date date,
    tax_rate numeric(3,2),
    username character varying(50)
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 55387)
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_transaction_id_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 228
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- TOC entry 231 (class 1259 OID 55395)
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    role_id integer NOT NULL,
    username character varying(50),
    role character varying(50),
    ts_insert timestamp without time zone,
    status character(1)
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 55394)
-- Name: user_role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_role_role_id_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 230
-- Name: user_role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_role_role_id_seq OWNED BY public.user_role.role_id;


--
-- TOC entry 232 (class 1259 OID 55507)
-- Name: vw.service; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."vw.service" AS
 SELECT ms.service_id,
    ms.service_name,
    ms.service_group,
    COALESCE(json_agg(json_build_object('category_id', msc.service_category_id, 'category_name', msc.category_name, 'price', pl.price)) FILTER (WHERE (msc.category_name IS NOT NULL)), '[]'::json) AS categories
   FROM ((public.master_service ms
     LEFT JOIN public.pricelists pl ON ((pl.service_id = ms.service_id)))
     LEFT JOIN public.master_service_category msc ON ((msc.service_category_id = pl.service_category_id)))
  GROUP BY ms.service_id, ms.service_name, ms.service_group
  ORDER BY ms.service_id;


ALTER VIEW public."vw.service" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 55517)
-- Name: vw.tran; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."vw.tran" AS
SELECT
    NULL::integer AS transaction_id,
    NULL::character varying(255) AS doctor_name,
    NULL::character varying(50) AS username,
    NULL::character varying(50) AS patient_name,
    NULL::date AS transaction_date,
    NULL::character varying(100) AS service_group,
    NULL::character varying(255) AS category_name,
    NULL::numeric(3,2) AS tax_rate,
    NULL::numeric AS sub_total,
    NULL::numeric AS grand_total,
    NULL::jsonb AS transaction_detail;


ALTER VIEW public."vw.tran" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 55512)
-- Name: vw.transactions; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."vw.transactions" AS
SELECT
    NULL::integer AS transaction_id,
    NULL::character varying(255) AS doctor_name,
    NULL::character varying(50) AS username,
    NULL::character varying(50) AS patient_name,
    NULL::date AS transaction_date,
    NULL::character varying(100) AS service_group,
    NULL::numeric(3,2) AS tax_rate,
    NULL::numeric AS sub_total,
    NULL::numeric AS grand_total,
    NULL::jsonb AS transaction_detail;


ALTER VIEW public."vw.transactions" OWNER TO postgres;

--
-- TOC entry 4741 (class 2604 OID 55336)
-- Name: master_doctor doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_doctor ALTER COLUMN doctor_id SET DEFAULT nextval('public.master_doctor_doctor_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 55345)
-- Name: master_service service_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_service ALTER COLUMN service_id SET DEFAULT nextval('public.master_service_service_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 55352)
-- Name: master_service_category service_category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_service_category ALTER COLUMN service_category_id SET DEFAULT nextval('public.master_service_category_service_category_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 55359)
-- Name: master_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_user ALTER COLUMN id SET DEFAULT nextval('public.master_user_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 55375)
-- Name: pricelists pricelist_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricelists ALTER COLUMN pricelist_id SET DEFAULT nextval('public.pricelists_pricelist_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 55391)
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 55398)
-- Name: user_role role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role ALTER COLUMN role_id SET DEFAULT nextval('public.user_role_role_id_seq'::regclass);


--
-- TOC entry 4911 (class 0 OID 55333)
-- Dependencies: 218
-- Data for Name: master_doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_doctor (doctor_id, doctor_name_name, address, city, country, kategori, contact_phone) FROM stdin;
1	Dr Mahendra	123 Main St, Jakarta	Jakarta	Indonesia	Umum	+62 812-3456-7890
2	Dr Agung	45 Orchard Rd, Singapore	Singapore	Singapore	Umum	+65 9876-5432
3	Dr Jaya	789 Market St, Kuala Lumpur	Kuala Lumpur	Malaysia	Spesialis	+60 123-456-7890
4	Dr widia	321 Broadway, Surabaya	Surabaya	Indonesia	Spesialis	+62 813-9876-5432
5	Dr Andika	567 Ocean Blvd, Bangkok	Bangkok	Thailand	Gigi	+66 987-654-3210
7	tes isi	jl	kota	Indonesia	Umum	+62 85691919544
8	dzikri	jl tes	kota	Indonesia	Umum	+62 85691919544
11	tess	jl. test	Makau	Thailand	Spesialis	+66 666212313112
\.


--
-- TOC entry 4913 (class 0 OID 55342)
-- Dependencies: 220
-- Data for Name: master_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_service (service_id, service_name, service_group) FROM stdin;
1	Konsul Dr Umum	IGD
2	Konsul Dr Spesialis	Poli Spesialis
3	Konsul Dr Gigi	Poli Gigi
4	Pemeriksaan Darah	Laboratorium
5	Pemeriksaan Urin	Laboratorium
8	Pemeriksaan Kejiwaan	Dukun
10	Periksa kaki	kaki
12	ad	testinglagi?
13	testing	updatetesting
14	testing	qwe
\.


--
-- TOC entry 4915 (class 0 OID 55349)
-- Dependencies: 222
-- Data for Name: master_service_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_service_category (service_category_id, category_name) FROM stdin;
1	Perorangan
2	BPJS
3	Perusahaan (Mitra)
4	Perusahaan (Guarantee Letter)
5	Asuransi Admedika
7	update
12	hahaupg
15	as
\.


--
-- TOC entry 4917 (class 0 OID 55356)
-- Dependencies: 224
-- Data for Name: master_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_user (id, username, email, hash_password, ts_insert, status) FROM stdin;
1	johndoe	johndoe@gmail.com	4b0eb5f16387c4f25de52545951250e1	2025-01-15 00:00:00	D
2	johndoe	johndoe@gmail.com	daa20fa4d03bf8df25a8222d0646c6bd	2025-01-15 00:00:00	A
3	michael	michael@outlook.com	6a91cebd576b6d6ac03a38fb88960c47	2025-01-15 00:00:00	D
4	emilyr	emilyr@yahoo.com	4c73a7c155ef25b4ea56568484253d67	2025-01-15 00:00:00	A
5	roberts	roberts@gmail.com	0d6d3bf1c4a6da80e88c010dc9110314	2025-01-15 00:00:00	A
6	alexk	alexk@hotmail.com	15128a7799d575e954c971496e3d3999	2025-01-15 00:00:00	A
7	samanthaa	samantha@outlook.com	98950009948e8f307dffc846d02d6c5e	2025-01-15 00:00:00	D
8	michael	michael@outlook.com	5af8467885d3d00a1b08db0944917704	2025-01-15 00:00:00	A
9	davidp	davidp@gmail.com	a67f3fa69691228d1a8086f132eec086	2025-01-15 00:00:00	A
10	laurac	laurac@live.com	0b02125338a61665448bc9e81ed655fe	2025-01-15 00:00:00	A
11	dzikri	dzikri@gmail.com	b64d39a5bb552206fb1452fc33cd74e5	\N	A
\.


--
-- TOC entry 4919 (class 0 OID 55372)
-- Dependencies: 226
-- Data for Name: pricelists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pricelists (pricelist_id, service_id, service_category_id, price) FROM stdin;
1	1	1	75000.00
2	1	2	50000.00
3	1	3	65000.00
4	1	4	70000.00
5	1	5	55000.00
6	2	1	175000.00
7	2	2	125000.00
8	2	3	150000.00
9	2	4	160000.00
10	2	5	135000.00
11	3	1	150000.00
12	3	2	100000.00
13	3	3	125000.00
14	3	4	135000.00
15	3	5	110000.00
16	4	1	350000.00
17	4	2	275000.00
18	4	3	320000.00
19	4	4	330000.00
20	4	5	300000.00
21	5	1	400000.00
22	5	2	320000.00
23	5	3	350000.00
24	5	4	360000.00
25	5	5	330000.00
26	8	1	1000.00
27	8	2	1500.00
28	8	3	3000.00
30	8	5	7000.00
31	9	1	1000.00
32	9	2	1500.00
33	9	3	3000.00
34	9	4	5000.00
39	11	1	121000.00
35	10	1	1000.00
36	10	2	1500.00
37	10	3	3000.00
38	10	4	6000.00
40	12	2	20000.00
41	13	3	1000.00
42	13	2	11000.00
43	13	1	1000.00
44	13	4	10000.00
45	13	7	10000.00
49	15	2	10.00
46	14	12	100.00
47	14	3	100.00
48	14	1	10.00
50	14	2	100.00
\.


--
-- TOC entry 4920 (class 0 OID 55378)
-- Dependencies: 227
-- Data for Name: transaction_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_details (transaction_id, service_id, service_category, quantity, price, amount) FROM stdin;
1	4	2	1	275000.00	275000.00
1	5	2	1	320000.00	320000.00
2	3	1	1	150000.00	150000.00
3	3	1	1	150000.00	150000.00
4	1	3	1	65000.00	65000.00
5	5	3	1	350000.00	350000.00
6	4	3	1	320000.00	320000.00
6	5	1	1	400000.00	400000.00
7	2	5	1	135000.00	135000.00
8	1	3	1	65000.00	65000.00
9	4	4	1	330000.00	330000.00
9	5	5	1	330000.00	330000.00
10	5	3	1	350000.00	350000.00
11	2	3	1	150000.00	150000.00
12	4	4	1	330000.00	330000.00
13	1	1	1	75000.00	75000.00
14	4	2	1	275000.00	275000.00
14	5	5	1	330000.00	330000.00
15	1	3	1	65000.00	65000.00
16	2	5	1	135000.00	135000.00
17	4	5	1	300000.00	300000.00
18	5	4	1	360000.00	360000.00
19	1	4	1	70000.00	70000.00
20	2	2	1	125000.00	125000.00
21	4	4	1	330000.00	330000.00
22	4	1	1	350000.00	350000.00
22	5	3	1	350000.00	350000.00
23	2	2	1	125000.00	125000.00
24	1	3	1	65000.00	65000.00
25	4	3	1	320000.00	320000.00
38	2	3	\N	150000.00	300000.00
38	2	5	\N	135000.00	135000.00
39	4	1	1	350000.00	350000.00
39	4	2	1	275000.00	275000.00
41	4	1	1	350000.00	350000.00
41	4	2	1	275000.00	275000.00
44	1	1	1	75000.00	75000.00
44	4	2	1	275000.00	275000.00
45	1	1	1	75000.00	75000.00
45	4	2	1	275000.00	275000.00
46	8	2	1	1500.00	1500.00
47	1	2	1	50000.00	50000.00
47	1	4	1	70000.00	70000.00
48	4	1	1	350000.00	350000.00
48	4	3	1	320000.00	320000.00
49	8	2	3	1500.00	4500.00
\.


--
-- TOC entry 4922 (class 0 OID 55388)
-- Dependencies: 229
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (transaction_id, service_group, doctor_id, patient_name, transaction_date, tax_rate, username) FROM stdin;
1	Laboratorium	\N	Alice	2024-12-10	0.15	johndoe
2	Poli Gigi	5	\N	2024-11-08	0.15	johndoe
3	Poli Gigi	5	\N	2024-10-09	0.15	michael
4	IGD	2	\N	2024-12-12	0.00	michael
5	Laboratorium	\N	David	2024-11-15	0.10	johndoe
6	Laboratorium	\N	Nana	2025-01-06	0.10	michael
7	Poli Spesialis	3	\N	2024-12-01	0.10	emilyr
8	IGD	1	\N	2024-11-04	0.00	johndoe
9	Laboratorium	\N	Alice	2025-01-01	0.00	emilyr
10	Laboratorium	\N	Alice	2024-11-10	0.00	roberts
11	Poli Spesialis	3	\N	2025-01-05	0.10	roberts
12	Laboratorium	\N	Eve	2024-10-07	0.00	johndoe
13	IGD	2	\N	2024-10-22	0.00	roberts
14	Laboratorium	\N	Charlie	2025-01-02	0.10	michael
15	IGD	2	David	2025-01-12	0.10	roberts
16	Poli Spesialis	3	Charlie	2024-11-07	0.15	roberts
17	Laboratorium	\N	Alice	2024-11-07	0.15	alexk
18	Laboratorium	\N	Bob	2024-12-03	0.15	michael
19	IGD	2	\N	2024-12-14	0.15	davidp
20	Poli Spesialis	3	\N	2024-12-21	0.10	emilyr
21	Laboratorium	\N	Alice	2024-11-13	0.15	johndoe
22	Laboratorium	\N	Charlie	2024-10-26	0.10	johndoe
23	Poli Spesialis	4	\N	2024-10-24	0.15	johndoe
24	IGD	1	\N	2024-11-12	0.00	alexk
25	Laboratorium	\N	Eve	2024-11-07	0.15	alexk
38	Poli Spesialis	1	Dzikri	2025-03-17	0.10	dzikri
39	Laboratorium	2	Fauzi	2025-03-17	0.15	John Doe
41	Laboratorium	2	Fauzi	2025-03-17	0.15	John Doe
44	IGD	2	Fauzi	2025-03-17	0.15	John Doe
45	IGD	2	Fauzi	2025-03-17	0.15	John Doew
46	Dukun	2	etstfe	2022-12-12	0.15	dzikri
47	IGD	12	oketestakhirfe	2025-12-12	0.15	dzikri
48	Laboratorium	11	tes	2025-03-19	0.05	dzikri
49	Dukun	3	testfe	2025-02-26	0.10	dzikri
\.


--
-- TOC entry 4924 (class 0 OID 55395)
-- Dependencies: 231
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (role_id, username, role, ts_insert, status) FROM stdin;
1	johndoe	kasir	2025-01-15 00:00:00	D
2	johndoe	admin	2025-01-15 00:00:00	A
3	johndoe	customer service	2025-01-15 00:00:00	A
4	michael	kasir	2025-01-15 00:00:00	A
5	emilyr	customer service	2025-01-15 00:00:00	A
6	roberts	customer service	2025-01-15 00:00:00	A
7	roberts	kasir	2025-01-15 00:00:00	A
8	roberts	admin	2025-01-15 00:00:00	D
9	alexk	customer service	2025-01-15 00:00:00	A
10	alexk	admin	2025-01-15 00:00:00	A
11	samanthaa	customer service	2025-01-15 00:00:00	A
12	michael	customer service	2025-01-15 00:00:00	A
13	davidp	kasir	2025-01-15 00:00:00	D
14	davidp	customer service	2025-01-15 00:00:00	A
15	davidp	admin	2025-01-15 00:00:00	D
16	laurac	customer service	2025-01-15 00:00:00	D
17	laurac	admin	2025-01-15 00:00:00	D
18	laurac	kasir	2025-01-15 00:00:00	A
\.


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 217
-- Name: master_doctor_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_doctor_doctor_id_seq', 13, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 221
-- Name: master_service_category_service_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_service_category_service_category_id_seq', 15, true);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 219
-- Name: master_service_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_service_service_id_seq', 15, true);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 223
-- Name: master_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_user_id_seq', 11, true);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 225
-- Name: pricelists_pricelist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pricelists_pricelist_id_seq', 50, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 228
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_transaction_id_seq', 49, true);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 230
-- Name: user_role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_role_role_id_seq', 18, true);


--
-- TOC entry 4749 (class 2606 OID 55340)
-- Name: master_doctor master_doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_doctor
    ADD CONSTRAINT master_doctor_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 4753 (class 2606 OID 55354)
-- Name: master_service_category master_service_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_service_category
    ADD CONSTRAINT master_service_category_pkey PRIMARY KEY (service_category_id);


--
-- TOC entry 4751 (class 2606 OID 55347)
-- Name: master_service master_service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_service
    ADD CONSTRAINT master_service_pkey PRIMARY KEY (service_id);


--
-- TOC entry 4755 (class 2606 OID 55363)
-- Name: master_user master_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_user
    ADD CONSTRAINT master_user_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 55377)
-- Name: pricelists pricelists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricelists
    ADD CONSTRAINT pricelists_pkey PRIMARY KEY (pricelist_id);


--
-- TOC entry 4759 (class 2606 OID 55393)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 4761 (class 2606 OID 55400)
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4908 (class 2618 OID 55515)
-- Name: vw.transactions _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public."vw.transactions" AS
 SELECT t.transaction_id,
    d.doctor_name_name AS doctor_name,
    t.username,
    t.patient_name,
    t.transaction_date,
    ms.service_group,
    t.tax_rate,
    COALESCE(sum(td.amount)) AS sub_total,
    (COALESCE(sum(td.amount), ((0)::bigint)::numeric) * ((1)::numeric + t.tax_rate)) AS grand_total,
    jsonb_agg(jsonb_build_object('category_name', msc.category_name, 'service_name', ms.service_name, 'quantity', td.quantity, 'price', td.price, 'amount', td.amount)) AS transaction_detail
   FROM ((((public.transactions t
     LEFT JOIN public.master_doctor d ON ((t.doctor_id = d.doctor_id)))
     LEFT JOIN public.transaction_details td ON ((t.transaction_id = td.transaction_id)))
     LEFT JOIN public.master_service ms ON ((td.service_id = ms.service_id)))
     LEFT JOIN public.master_service_category msc ON ((td.service_category = msc.service_category_id)))
  GROUP BY t.transaction_id, d.doctor_name_name, ms.service_group, t.patient_name, t.transaction_date, t.tax_rate;


--
-- TOC entry 4909 (class 2618 OID 55520)
-- Name: vw.tran _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public."vw.tran" AS
 SELECT t.transaction_id,
    d.doctor_name_name AS doctor_name,
    t.username,
    t.patient_name,
    t.transaction_date,
    ms.service_group,
    msc.category_name,
    t.tax_rate,
    COALESCE(sum(td.amount)) AS sub_total,
    (COALESCE(sum(td.amount), ((0)::bigint)::numeric) * ((1)::numeric + t.tax_rate)) AS grand_total,
    jsonb_agg(jsonb_build_object('service_name', ms.service_name, 'quantity', td.quantity, 'price', td.price, 'amount', td.amount)) AS transaction_detail
   FROM ((((public.transactions t
     LEFT JOIN public.master_doctor d ON ((t.doctor_id = d.doctor_id)))
     LEFT JOIN public.transaction_details td ON ((t.transaction_id = td.transaction_id)))
     LEFT JOIN public.master_service ms ON ((td.service_id = ms.service_id)))
     LEFT JOIN public.master_service_category msc ON ((td.service_category = msc.service_category_id)))
  GROUP BY t.transaction_id, msc.category_name, d.doctor_name_name, ms.service_group, t.patient_name, t.transaction_date, t.tax_rate;


-- Completed on 2025-03-19 16:59:38

--
-- PostgreSQL database dump complete
--

