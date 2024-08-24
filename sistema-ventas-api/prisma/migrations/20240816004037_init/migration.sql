-- CreateTable
CREATE TABLE `tbl_usuario` (
    `cveUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(250) NOT NULL,
    `apellidos` VARCHAR(600) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `username` VARCHAR(150) NOT NULL,
    `password` VARCHAR(800) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cveUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usuario_roles` (
    `usuarioId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`, `rolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UsuarioRoles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UsuarioRoles_AB_unique`(`A`, `B`),
    INDEX `_UsuarioRoles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_usuario_roles` ADD CONSTRAINT `tbl_usuario_roles_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `tbl_usuario`(`cveUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_usuario_roles` ADD CONSTRAINT `tbl_usuario_roles_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `tbl_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioRoles` ADD CONSTRAINT `_UsuarioRoles_A_fkey` FOREIGN KEY (`A`) REFERENCES `tbl_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioRoles` ADD CONSTRAINT `_UsuarioRoles_B_fkey` FOREIGN KEY (`B`) REFERENCES `tbl_usuario`(`cveUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
