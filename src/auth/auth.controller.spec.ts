// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
// import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             register: jest.fn(),
//             login: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     authController = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(authController).toBeDefined();
//   });

//   describe('register', () => {
//     it('should register a user and return a success message', async () => {
//       const createUserDto: AuthRegisterLoginDto = { email: 'test@example.com', password: 'password', firstName:'john', lastName:'doe' };
//       const mockUser = { id: 1, email: 'test@example.com' };
//       jest.spyOn(authService, 'register').mockResolvedValueOnce(mockUser);

//       const result = await authController.register(createUserDto);
//       expect(result).toEqual({ message: 'User created successfull!' });
//       expect(authService.register).toHaveBeenCalledWith(createUserDto);
//     });
//   });

//   describe('login', () => {
//     it('should login a user and return a token and user details', async () => {
//       const loginDto: AuthEmailLoginDto = { email: 'test@example.com', password: 'password' };
//       const loginResult = { token: 'token123', user: { id: 1, email: 'test@example.com' } };
//       jest.spyOn(authService, 'login').mockResolvedValueOnce(loginResult);

//       const result = await authController.login(loginDto);
//       expect(result).toEqual(loginResult);
//       expect(authService.login).toHaveBeenCalledWith(loginDto);
//     });
//   });
// });
