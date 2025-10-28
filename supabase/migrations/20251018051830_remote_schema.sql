

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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."Grip" AS ENUM (
    'Micro',
    'Bajo',
    'Medio',
    'Alto',
    'Sin definir'
);


ALTER TYPE "public"."Grip" OWNER TO "postgres";


COMMENT ON TYPE "public"."Grip" IS 'Types of grips';



CREATE TYPE "public"."Season" AS ENUM (
    'Amor y amistad',
    'Halloween',
    'Navidad',
    'Sin definir'
);


ALTER TYPE "public"."Season" OWNER TO "postgres";


COMMENT ON TYPE "public"."Season" IS 'Types of seasons';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text",
    "price" numeric NOT NULL,
    "stock" smallint NOT NULL,
    "imagePath" "text" DEFAULT ''::"text" NOT NULL,
    "season" "public"."Season" DEFAULT 'Sin definir'::"public"."Season" NOT NULL,
    "visible" boolean DEFAULT false NOT NULL,
    "grip" "public"."Grip" DEFAULT 'Sin definir'::"public"."Grip" NOT NULL,
    "sku" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE ONLY "public"."products" REPLICA IDENTITY FULL;


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products_duplicate" (
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text",
    "price" numeric NOT NULL,
    "stock" smallint NOT NULL,
    "imagePath" "text" DEFAULT ''::"text",
    "grip" "text" NOT NULL,
    "season" "public"."Season" DEFAULT 'Sin definir'::"public"."Season" NOT NULL,
    "visible" boolean DEFAULT false NOT NULL,
    "sku" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."products_duplicate" OWNER TO "postgres";


COMMENT ON TABLE "public"."products_duplicate" IS 'This is a duplicate of products';



ALTER TABLE ONLY "public"."products_duplicate"
    ADD CONSTRAINT "products_duplicate_id_key1" UNIQUE ("id");



ALTER TABLE ONLY "public"."products_duplicate"
    ADD CONSTRAINT "products_duplicate_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."products_duplicate"
    ADD CONSTRAINT "products_duplicate_pkey" PRIMARY KEY ("sku", "id");



ALTER TABLE ONLY "public"."products_duplicate"
    ADD CONSTRAINT "products_duplicate_sku_key" UNIQUE ("sku");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("sku", "id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_sku_key" UNIQUE ("sku");



ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products_duplicate" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."products_duplicate" TO "anon";
GRANT ALL ON TABLE "public"."products_duplicate" TO "authenticated";
GRANT ALL ON TABLE "public"."products_duplicate" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

