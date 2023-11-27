create database casoagencia;

create table clientes (
	rut int not null,
    nombre varchar(50),
    apellido varchar(50),
    correo varchar(50),
    telefono int
);
-- la pk es rut

-- Tabla para los vuelos (pack)
create table vuelos(
	id_vuelo int not null,
    fecha_hora_partida datetime,
    fecha_hora_llegada datetime,
    ciudad_origen varchar(50),
    ciudad_destino varchar(50),
    aeropuerto_origen varchar(50),
    aeropuerto_llegada varchar(50),
    pais_origen varchar(50),
    pais_destino varchar(50)
);
-- la pk es id_vuelo

-- Tabla para las reservas
create table reservas (
    id_reserva int auto_increment primary key,
    id_estado_reserva int,
    rut_cliente int,
    id_vuelo int
);
-- la pk es id_reserva


-- definimos las pk

alter table clientes
add constraint clientes_pk primary key (rut);

alter table vuelos
add constraint vuelos_pk primary key (id_vuelo);


-- definimos las fk
alter table reservas
add constraint reservas_fk
foreign key (rut_cliente) references clientes(rut);

alter table reservas
add constraint reservas_2fk
foreign key (id_vuelo) references vuelos(id_vuelo);

-- subida de datos

-- Insertar datos en la tabla clientes
INSERT INTO clientes (rut, nombre, apellido, correo, telefono)
VALUES
    (123456789, 'Juan', 'Pérez', 'juan.perez@example.com', 982249876),
    (987654321, 'María', 'Gómez', 'maria.gomez@example.com', 956348876),
    (555555555, 'Carlos', 'Ruiz', 'carlos.ruiz@example.com', 978766545);
    
-- Insertar datos en la tabla vuelos
INSERT INTO vuelos (id_vuelo, fecha_hora_partida, fecha_hora_llegada, ciudad_origen, ciudad_destino, aeropuerto_origen, aeropuerto_llegada, pais_origen, pais_destino)
VALUES
    (1, '2023-12-01 08:00:00', '2023-12-01 10:00:00', 'Ciudad A', 'Ciudad B', 'Aeropuerto A', 'Aeropuerto B', 'País A', 'País B'),
    (2, '2023-12-02 12:00:00', '2023-12-02 14:00:00', 'Ciudad B', 'Ciudad C', 'Aeropuerto B', 'Aeropuerto C', 'País B', 'País C'),
    (3, '2023-12-03 16:00:00', '2023-12-03 18:00:00', 'Ciudad C', 'Ciudad A', 'Aeropuerto C', 'Aeropuerto A', 'País C', 'País A');

-- Insertar datos en la tabla reservas
INSERT INTO reservas (id_estado_reserva, rut_cliente, id_vuelo)
VALUES
	(1, 123456789, 2),
	(2, 987654321, 2),
	(1, 555555555, 3);
    
insert into reservas (id_estado_reserva, rut_cliente, id_vuelo)
VALUES (1, 123456789, 1);

select * from clientes;

-- Reemplaza los valores a actualizar y el Rut del cliente específico
UPDATE clientes
SET
    nombre = 'Matias',
    apellido = 'Fernandez',
    correo = 'matigol@example.com',
    telefono = 987654321
WHERE
    rut = 123456789; -- Reemplaza con el Rut del cliente que deseas actualizar

DELETE FROM reservas WHERE rut_cliente = '123456789' AND id_reserva = '1';

select * from reservas;



