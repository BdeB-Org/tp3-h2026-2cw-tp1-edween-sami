-- Généré par Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   à :        2026-04-16 22:14:32 HAE
--   site :      Oracle Database 11g
--   type :      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE CLIENT (
    id_client INTEGER NOT NULL,
    nom VARCHAR2(20) NOT NULL,
    prenom VARCHAR2(20) NOT NULL,
    email VARCHAR2(30) NOT NULL,
    telephone VARCHAR2(15) NOT NULL,
    mdp VARCHAR2(20) NOT NULL,
    CONSTRAINT CLIENT_PK PRIMARY KEY (id_client)
);

CREATE TABLE LIEU (
    id_lieu INTEGER NOT NULL,
    nom VARCHAR2(20) NOT NULL,
    pays VARCHAR2(20) NOT NULL,
    ville VARCHAR2(20) NOT NULL,
    address VARCHAR2(30) NOT NULL,
    capacite INTEGER NOT NULL,
    CONSTRAINT LIEU_PK PRIMARY KEY (id_lieu)
);

CREATE TABLE EVENEMENT (
    id_evenement INTEGER NOT NULL,
    nom VARCHAR2(20) NOT NULL,
    date_evenement DATE NOT NULL,
    sport VARCHAR2(20) NOT NULL,
    id_lieu INTEGER NOT NULL,
    CONSTRAINT EVENEMENT_PK PRIMARY KEY (id_evenement),
    CONSTRAINT EVENEMENT_LIEU_FK FOREIGN KEY (id_lieu)
        REFERENCES LIEU(id_lieu)
);

CREATE TABLE BILLET (
    id_billet INTEGER NOT NULL,
    type VARCHAR2(20) NOT NULL,
    prix INTEGER NOT NULL,
    id_evenement INTEGER NOT NULL,
    CONSTRAINT BILLET_PK PRIMARY KEY (id_billet),
    CONSTRAINT BILLET_EVENEMENT_FK FOREIGN KEY (id_evenement)
        REFERENCES EVENEMENT(id_evenement)
);

CREATE TABLE COMMANDE (
    id_commande INTEGER NOT NULL,
    date_commande DATE NOT NULL,
    prix_total INTEGER NOT NULL,
    id_client INTEGER NOT NULL,
    CONSTRAINT COMMANDE_PK PRIMARY KEY (id_commande),
    CONSTRAINT COMMANDE_CLIENT_FK FOREIGN KEY (id_client)
        REFERENCES CLIENT(id_client)
);

CREATE TABLE DETAILLE_COMMANDE (
    id_detaille INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    id_commande INTEGER NOT NULL,
    id_billet INTEGER NOT NULL,
    CONSTRAINT DETAILLE_COMMANDE_PK PRIMARY KEY (id_detaille),
    CONSTRAINT DETAILLE_COMMANDE_COMMANDE_FK FOREIGN KEY (id_commande)
        REFERENCES COMMANDE(id_commande),
    CONSTRAINT DETAILLE_COMMANDE_BILLET_FK FOREIGN KEY (id_billet)
        REFERENCES BILLET(id_billet)
);

-- ========================
-- INSERTIONS DE DONNÉES
-- ========================

INSERT INTO CLIENT 
VALUES (1, 'Martinez', 'Edween', 'edweenmmartinez@outlook.com', '4387630941', 'edween123');

INSERT INTO CLIENT 
VALUES (2, 'Naib', 'Sami', 'SamiNaib@outlook.com', '5143487967', 'sami123');

INSERT INTO CLIENT 
VALUES (3, 'Messi', 'Lionel', 'messi@outlook.com', '5145551234', 'messi123');


INSERT INTO LIEU 
VALUES (1, 'Stade Lusail', 'Qatar', 'Lusail', 'Lusail Stadium Road', 88000);

INSERT INTO LIEU 
VALUES (2, 'Crypto Arena', 'USA', 'Los Angeles', '1111 S Figueroa St', 20000);

INSERT INTO LIEU 
VALUES (3, 'Amalie Arena', 'USA', 'Tampa', '401 Channelside Dr', 19000);


INSERT INTO EVENEMENT 
VALUES (1, 'Haiti vs Maroc', DATE '2026-06-10', 'Soccer', 1);

INSERT INTO EVENEMENT 
VALUES (2, 'Lakers vs Rockets', DATE '2026-05-20', 'Basketball', 2);

INSERT INTO EVENEMENT 
VALUES (3, 'Tampa vs Canadiens', DATE '2026-05-15', 'Hockey', 3);

INSERT INTO EVENEMENT VALUES (4, 'Real Madrid vs Barca', DATE '2026-07-01', 'Soccer', 1);

INSERT INTO EVENEMENT VALUES (5, 'Warriors vs Celtics', DATE '2026-07-12', 'Basketball', 2);

INSERT INTO EVENEMENT VALUES (6, 'Toronto vs Boston', DATE '2026-08-03', 'Hockey', 3);

INSERT INTO EVENEMENT VALUES (7, 'PSG vs Arsenal', DATE '2026-08-20', 'Soccer', 1);

INSERT INTO EVENEMENT VALUES (8, 'Bulls vs Heat', DATE '2026-09-10', 'Basketball', 2);

INSERT INTO EVENEMENT VALUES (9, 'Rangers vs Devils', DATE '2026-09-25', 'Hockey', 3);

INSERT INTO EVENEMENT VALUES (10, 'Canada vs USA', DATE '2026-10-05', 'Soccer', 1);

INSERT INTO EVENEMENT VALUES (11, 'Milan vs Juventus', DATE '2026-10-20', 'Soccer', 1);

INSERT INTO EVENEMENT VALUES (12, 'Knicks vs Nets', DATE '2026-11-02', 'Basketball', 2);

INSERT INTO EVENEMENT VALUES (13, 'Avalanche vs Oilers', DATE '2026-11-15', 'Hockey', 3);


INSERT INTO BILLET 
VALUES (1, 'VIP', 150, 1)
;
INSERT INTO BILLET 
VALUES (2, 'Standard', 75, 1);

INSERT INTO BILLET 
VALUES (3, 'VIP', 200, 2);

INSERT INTO BILLET 
VALUES (4, 'Standard', 100, 2);

INSERT INTO BILLET 
VALUES (5, 'VIP', 180, 3);

INSERT INTO BILLET 
VALUES (6, 'Standard', 90, 3);


INSERT INTO COMMANDE 
VALUES (1, DATE '2026-04-01', 300, 1);

INSERT INTO COMMANDE 
VALUES (2, DATE '2026-04-02', 200, 2);

INSERT INTO COMMANDE 
VALUES (3, DATE '2026-04-03', 180, 3);


INSERT INTO DETAILLE_COMMANDE
VALUES (1, 2, 1, 1);

INSERT INTO DETAILLE_COMMANDE
VALUES (2, 1, 1, 2);

INSERT INTO DETAILLE_COMMANDE 
VALUES (3, 1, 2, 3);

INSERT INTO DETAILLE_COMMANDE 
VALUES (4, 2, 3, 5);

commit;


BEGIN
  ORDS.ENABLE_SCHEMA(
    p_enabled => TRUE,
    p_schema => 'BILLETERIE',
    p_url_mapping_type => 'BASE_PATH',
    p_url_mapping_pattern => 'billeterie',
    p_auto_rest_auth => FALSE
  );
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'CLIENT', 'TABLE', 'client', FALSE);
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'LIEU', 'TABLE', 'lieu', FALSE);
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'EVENEMENT', 'TABLE', 'evenement', FALSE);
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'BILLET', 'TABLE', 'billet', FALSE);
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'COMMANDE', 'TABLE', 'commande', FALSE);
  COMMIT;
END;
/

BEGIN
  ORDS.ENABLE_OBJECT(TRUE, 'BILLETERIE', 'DETAILLE_COMMANDE', 'TABLE', 'detaille_commande', FALSE);
  COMMIT;
END;
/



-- Rapport récapitulatif d'Oracle SQL Developer Data Modeler : 
-- 
-- CREATE TABLE                             6
-- CREATE INDEX                             0
-- ALTER TABLE                             11
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0