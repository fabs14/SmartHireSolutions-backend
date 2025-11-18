import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterCandidatoDto } from './dto/register-candidato.dto';
import { RegisterReclutadorDto } from './dto/register-reclutador.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: registerDto.correo },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear el usuario
    const usuario = await this.prisma.usuario.create({
      data: {
        name: registerDto.name,
        lastname: registerDto.lastname,
        correo: registerDto.correo,
        password: hashedPassword,
        telefono: registerDto.telefono,
        fecha_nacimiento: registerDto.fecha_nacimiento
          ? new Date(registerDto.fecha_nacimiento)
          : null,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        correo: true,
        telefono: true,
        fecha_nacimiento: true,
        creado_en: true,
      },
    });

    // Generar token
    const token = this.generateToken(usuario.id, usuario.correo);

    return {
      usuario,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar usuario por correo
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: loginDto.correo },
      include: {
        candidato: true,
        reclutador: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token
    const token = this.generateToken(usuario.id, usuario.correo);

    // Determinar el tipo de usuario
    let tipoUsuario = 'usuario';
    if (usuario.candidato) {
      tipoUsuario = 'candidato';
    } else if (usuario.reclutador) {
      tipoUsuario = 'reclutador';
    }

    // Eliminar la contraseña del objeto de respuesta
    const { password, ...usuarioSinPassword } = usuario;

    return {
      usuario: usuarioSinPassword,
      tipoUsuario,
      token,
    };
  }

  private generateToken(userId: string, correo: string): string {
    const payload = { sub: userId, correo };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lastname: true,
        correo: true,
        telefono: true,
        fecha_nacimiento: true,
        candidato: true,
        reclutador: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }

  async registerCandidato(registerCandidatoDto: RegisterCandidatoDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: registerCandidatoDto.correo },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerCandidatoDto.password, 10);

    // Crear el usuario con el perfil de candidato en una transacción
    const usuario = await this.prisma.usuario.create({
      data: {
        name: registerCandidatoDto.name,
        lastname: registerCandidatoDto.lastname,
        correo: registerCandidatoDto.correo,
        password: hashedPassword,
        telefono: registerCandidatoDto.telefono,
        fecha_nacimiento: registerCandidatoDto.fecha_nacimiento
          ? new Date(registerCandidatoDto.fecha_nacimiento)
          : null,
        candidato: {
          create: {
            titulo: registerCandidatoDto.titulo,
            bio: registerCandidatoDto.bio,
            ubicacion: registerCandidatoDto.ubicacion,
          },
        },
      },
      include: {
        candidato: true,
      },
    });

    // Generar token
    const token = this.generateToken(usuario.id, usuario.correo);

    // Eliminar password de la respuesta
    const { password, ...usuarioSinPassword } = usuario;

    return {
      usuario: usuarioSinPassword,
      tipoUsuario: 'candidato',
      token,
    };
  }

  async registerReclutador(registerReclutadorDto: RegisterReclutadorDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: registerReclutadorDto.correo },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Verificar que la empresa existe
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: registerReclutadorDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('La empresa especificada no existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerReclutadorDto.password, 10);

    // Crear el usuario con el perfil de reclutador en una transacción
    const usuario = await this.prisma.usuario.create({
      data: {
        name: registerReclutadorDto.name,
        lastname: registerReclutadorDto.lastname,
        correo: registerReclutadorDto.correo,
        password: hashedPassword,
        telefono: registerReclutadorDto.telefono,
        fecha_nacimiento: registerReclutadorDto.fecha_nacimiento
          ? new Date(registerReclutadorDto.fecha_nacimiento)
          : null,
        reclutador: {
          create: {
            posicion: registerReclutadorDto.posicion,
            empresaId: registerReclutadorDto.empresaId,
          },
        },
      },
      include: {
        reclutador: {
          include: {
            empresa: true,
          },
        },
      },
    });

    // Generar token
    const token = this.generateToken(usuario.id, usuario.correo);

    // Eliminar password de la respuesta
    const { password, ...usuarioSinPassword } = usuario;

    return {
      usuario: usuarioSinPassword,
      tipoUsuario: 'reclutador',
      token,
    };
  }
}
