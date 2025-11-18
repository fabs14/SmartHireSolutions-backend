import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CursosService {
  private catalogoCursos: Record<string, any[]>;

  constructor(private prisma: PrismaService) {
    // Catálogo de cursos reales organizados por tecnología/habilidad
    this.catalogoCursos = {
      'React': [
        { nombre: 'React - The Complete Guide 2024', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', nivel: 7, duracion: 48 },
        { nombre: 'Complete React Developer', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-react-developer-zero-to-mastery/', nivel: 8, duracion: 40 },
        { nombre: 'Modern React with Redux', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-redux/', nivel: 7, duracion: 52 }
      ],
      'Angular': [
        { nombre: 'Angular - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', nivel: 8, duracion: 34 },
        { nombre: 'Angular Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/angular-fundamentals', nivel: 6, duracion: 9 },
        { nombre: 'Angular for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/angular-for-beginners-course/', nivel: 5, duracion: 10 }
      ],
      'Vue': [
        { nombre: 'Vue - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', nivel: 7, duracion: 32 },
        { nombre: 'Vue.js Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/vuejs-fundamentals', nivel: 6, duracion: 5 },
        { nombre: 'Vue 3 Masterclass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/vue-3-masterclass/', nivel: 8, duracion: 40 }
      ],
      'TypeScript': [
        { nombre: 'Understanding TypeScript', proveedor: 'Udemy', url: 'https://www.udemy.com/course/understanding-typescript/', nivel: 7, duracion: 15 },
        { nombre: 'TypeScript Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/typescript', nivel: 6, duracion: 4 },
        { nombre: 'TypeScript: The Complete Developer Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/', nivel: 7, duracion: 24 }
      ],
      'Node.js': [
        { nombre: 'Node.js, Express, MongoDB & More', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', nivel: 8, duracion: 42 },
        { nombre: 'The Complete Node.js Developer Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', nivel: 7, duracion: 35 },
        { nombre: 'Node.js Advanced Concepts', proveedor: 'Udemy', url: 'https://www.udemy.com/course/advanced-node-for-developers/', nivel: 9, duracion: 16 }
      ],
      'NestJS': [
        { nombre: 'NestJS Zero to Hero', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nestjs-zero-to-hero/', nivel: 8, duracion: 6 },
        { nombre: 'NestJS: The Complete Developer Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nestjs-the-complete-developers-guide/', nivel: 7, duracion: 20 },
        { nombre: 'NestJS Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/nestjs-fundamentals', nivel: 6, duracion: 3 }
      ],
      'Python': [
        { nombre: '100 Days of Code: Python', proveedor: 'Udemy', url: 'https://www.udemy.com/course/100-days-of-code/', nivel: 7, duracion: 60 },
        { nombre: 'Complete Python Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-python-bootcamp/', nivel: 6, duracion: 22 },
        { nombre: 'Python for Everybody', proveedor: 'Coursera', url: 'https://www.coursera.org/specializations/python', nivel: 5, duracion: 40 }
      ],
      'Django': [
        { nombre: 'Python Django - The Practical Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/python-django-the-practical-guide/', nivel: 7, duracion: 23 },
        { nombre: 'Django for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/django-for-beginners/', nivel: 6, duracion: 8 },
        { nombre: 'Django Web Framework', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/django-web-framework', nivel: 7, duracion: 20 }
      ],
      'FastAPI': [
        { nombre: 'FastAPI - The Complete Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/fastapi-the-complete-course/', nivel: 7, duracion: 19 },
        { nombre: 'Building APIs with FastAPI', proveedor: 'Udemy', url: 'https://www.udemy.com/course/fastapi-rest/', nivel: 6, duracion: 4 },
        { nombre: 'Python API Development with FastAPI', proveedor: 'Udemy', url: 'https://www.udemy.com/course/python-api-development-fundamentals/', nivel: 8, duracion: 19 }
      ],
      'PostgreSQL': [
        { nombre: 'SQL & PostgreSQL for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/sql-and-postgresql-for-beginners/', nivel: 6, duracion: 10 },
        { nombre: 'Complete PostgreSQL Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/postgresqlmasterclass/', nivel: 7, duracion: 8 },
        { nombre: 'PostgreSQL: Advanced Queries', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/postgresql-advanced-queries', nivel: 8, duracion: 3 }
      ],
      'MongoDB': [
        { nombre: 'MongoDB - The Complete Developer Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/', nivel: 7, duracion: 16 },
        { nombre: 'MongoDB University M001', proveedor: 'MongoDB University', url: 'https://university.mongodb.com/courses/M001/about', nivel: 6, duracion: 10 },
        { nombre: 'MongoDB Essentials', proveedor: 'Udemy', url: 'https://www.udemy.com/course/mongodb-essentials/', nivel: 5, duracion: 6 }
      ],
      'MySQL': [
        { nombre: 'SQL - MySQL for Data Analytics', proveedor: 'Udemy', url: 'https://www.udemy.com/course/sql-mysql-for-data-analytics-and-business-intelligence/', nivel: 7, duracion: 10 },
        { nombre: 'The Ultimate MySQL Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/', nivel: 6, duracion: 20 },
        { nombre: 'MySQL Database Administration', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/mysql-database-administration', nivel: 8, duracion: 4 }
      ],
      'Docker': [
        { nombre: 'Docker Mastery', proveedor: 'Udemy', url: 'https://www.udemy.com/course/docker-mastery/', nivel: 8, duracion: 19 },
        { nombre: 'Docker for Developers', proveedor: 'Udemy', url: 'https://www.udemy.com/course/docker-for-developers/', nivel: 7, duracion: 5 },
        { nombre: 'Docker Deep Dive', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/docker-deep-dive-update', nivel: 8, duracion: 6 }
      ],
      'Kubernetes': [
        { nombre: 'Kubernetes for Developers', proveedor: 'Udemy', url: 'https://www.udemy.com/course/kubernetes-for-developers/', nivel: 8, duracion: 15 },
        { nombre: 'Kubernetes Mastery', proveedor: 'Udemy', url: 'https://www.udemy.com/course/kubernetesmastery/', nivel: 9, duracion: 14 },
        { nombre: 'Kubernetes Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/kubernetes-getting-started', nivel: 7, duracion: 4 }
      ],
      'AWS': [
        { nombre: 'AWS Certified Solutions Architect', proveedor: 'Udemy', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', nivel: 8, duracion: 27 },
        { nombre: 'AWS Developer Associate', proveedor: 'Udemy', url: 'https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/', nivel: 8, duracion: 28 },
        { nombre: 'AWS Fundamentals', proveedor: 'Coursera', url: 'https://www.coursera.org/specializations/aws-fundamentals', nivel: 6, duracion: 16 }
      ],
      'React Native': [
        { nombre: 'React Native - The Practical Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-native-the-practical-guide/', nivel: 7, duracion: 32 },
        { nombre: 'Complete React Native', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-complete-react-native-and-redux-course/', nivel: 8, duracion: 30 },
        { nombre: 'React Native for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-native-for-beginners/', nivel: 6, duracion: 12 }
      ],
      'Flutter': [
        { nombre: 'Flutter & Dart - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', nivel: 7, duracion: 42 },
        { nombre: 'The Complete Flutter Development Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/flutter-bootcamp-with-dart/', nivel: 8, duracion: 28 },
        { nombre: 'Flutter Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/flutter-getting-started', nivel: 6, duracion: 4 }
      ],
      'Jest': [
        { nombre: 'Jest Crash Course - Unit Testing in JavaScript', proveedor: 'Udemy', url: 'https://www.udemy.com/course/jest-crash-course/', nivel: 6, duracion: 3 },
        { nombre: 'JavaScript Testing with Jest', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/javascript-testing-jest', nivel: 7, duracion: 3 },
        { nombre: 'Testing React with Jest and Testing Library', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-testing-library/', nivel: 7, duracion: 8 }
      ],
      'Scrum': [
        { nombre: 'Agile with Atlassian Jira', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/agile-atlassian-jira', nivel: 6, duracion: 10 },
        { nombre: 'Scrum Master Certification', proveedor: 'Udemy', url: 'https://www.udemy.com/course/scrum-master-certification/', nivel: 7, duracion: 6 },
        { nombre: 'Scrum Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/scrum-fundamentals', nivel: 6, duracion: 2 }
      ],
      'Agile': [
        { nombre: 'Agile Fundamentals', proveedor: 'Udemy', url: 'https://www.udemy.com/course/agile-fundamentals-scrum-kanban-scrumban/', nivel: 6, duracion: 3 },
        { nombre: 'Agile Development Specialization', proveedor: 'Coursera', url: 'https://www.coursera.org/specializations/agile-development', nivel: 7, duracion: 24 },
        { nombre: 'Introduction to Agile', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/agile-fundamentals', nivel: 5, duracion: 2 }
      ],
      'Git': [
        { nombre: 'Git Complete: The Definitive Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/git-complete/', nivel: 7, duracion: 6 },
        { nombre: 'Git & GitHub Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/git-and-github-bootcamp/', nivel: 6, duracion: 17 },
        { nombre: 'Git Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/git-fundamentals', nivel: 6, duracion: 2 }
      ],
      'JavaScript': [
        { nombre: 'JavaScript - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/', nivel: 7, duracion: 52 },
        { nombre: 'Modern JavaScript From The Beginning', proveedor: 'Udemy', url: 'https://www.udemy.com/course/modern-javascript-from-the-beginning/', nivel: 6, duracion: 21 },
        { nombre: 'JavaScript: Understanding the Weird Parts', proveedor: 'Udemy', url: 'https://www.udemy.com/course/understand-javascript/', nivel: 8, duracion: 11 }
      ],
      'Java': [
        { nombre: 'Java Programming Masterclass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', nivel: 7, duracion: 80 },
        { nombre: 'Java Fundamentals', proveedor: 'Pluralsight', url: 'https://www.pluralsight.com/courses/java-fundamentals-language', nivel: 6, duracion: 5 },
        { nombre: 'Complete Java Developer', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-java-developer-course/', nivel: 8, duracion: 78 }
      ],
      'Spring Boot': [
        { nombre: 'Spring Boot - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/spring-hibernate-tutorial/', nivel: 8, duracion: 47 },
        { nombre: 'Spring Framework & Spring Boot', proveedor: 'Udemy', url: 'https://www.udemy.com/course/spring-springboot-jpa-hibernate-zero-to-master/', nivel: 7, duracion: 58 }
      ],
      'Next.js': [
        { nombre: 'Next.js & React - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nextjs-react-the-complete-guide/', nivel: 7, duracion: 19 },
        { nombre: 'Complete Next.js Developer', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-nextjs-developer/', nivel: 8, duracion: 12 }
      ],
      'Nuxt.js': [
        { nombre: 'Nuxt.js - Vue.js on Steroids', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nuxtjs-vuejs-on-steroids/', nivel: 7, duracion: 6 },
        { nombre: 'Nuxt 3 - Complete Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nuxt3-complete-course/', nivel: 7, duracion: 8 }
      ],
      'HTML5': [
        { nombre: 'HTML & CSS - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', nivel: 5, duracion: 37 },
        { nombre: 'Modern HTML & CSS', proveedor: 'Udemy', url: 'https://www.udemy.com/course/modern-html-css-from-the-beginning/', nivel: 5, duracion: 21 }
      ],
      'CSS3': [
        { nombre: 'Advanced CSS and Sass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/advanced-css-and-sass/', nivel: 7, duracion: 28 },
        { nombre: 'CSS - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/', nivel: 6, duracion: 22 }
      ],
      'SASS': [
        { nombre: 'Advanced CSS and Sass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/advanced-css-and-sass/', nivel: 7, duracion: 28 }
      ],
      'Tailwind CSS': [
        { nombre: 'Tailwind CSS From Scratch', proveedor: 'Udemy', url: 'https://www.udemy.com/course/tailwind-from-scratch/', nivel: 6, duracion: 11 },
        { nombre: 'Tailwind CSS Complete Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/tailwindcss-course/', nivel: 6, duracion: 8 }
      ],
      'Bootstrap': [
        { nombre: 'Bootstrap 5 From Scratch', proveedor: 'Udemy', url: 'https://www.udemy.com/course/bootstrap-5-from-scratch/', nivel: 5, duracion: 6 },
        { nombre: 'Complete Bootstrap Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/bootstrap-4-from-scratch-with-5-projects/', nivel: 6, duracion: 11 }
      ],
      'Redux': [
        { nombre: 'Modern React with Redux', proveedor: 'Udemy', url: 'https://www.udemy.com/course/react-redux/', nivel: 7, duracion: 52 },
        { nombre: 'Redux Toolkit Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/redux-toolkit-tutorial/', nivel: 7, duracion: 5 }
      ],
      'GraphQL': [
        { nombre: 'GraphQL with React', proveedor: 'Udemy', url: 'https://www.udemy.com/course/graphql-with-react-course/', nivel: 8, duracion: 13 },
        { nombre: 'Complete GraphQL Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/graphql-bootcamp/', nivel: 7, duracion: 10 }
      ],
      'REST API': [
        { nombre: 'REST API Design, Development & Management', proveedor: 'Udemy', url: 'https://www.udemy.com/course/rest-api/', nivel: 7, duracion: 10 },
        { nombre: 'RESTful Web Services with Node.js', proveedor: 'Udemy', url: 'https://www.udemy.com/course/restful-web-service-with-nodejs/', nivel: 7, duracion: 8 }
      ],
      'Microservices': [
        { nombre: 'Microservices with Node.js and React', proveedor: 'Udemy', url: 'https://www.udemy.com/course/microservices-with-node-js-and-react/', nivel: 9, duracion: 54 },
        { nombre: 'Master Microservices with Spring Boot', proveedor: 'Udemy', url: 'https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/', nivel: 8, duracion: 22 }
      ],
      'Redis': [
        { nombre: 'Redis: The Complete Developer Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/redis-the-complete-developers-guide/', nivel: 7, duracion: 13 }
      ],
      'Elasticsearch': [
        { nombre: 'Complete Guide to Elasticsearch', proveedor: 'Udemy', url: 'https://www.udemy.com/course/elasticsearch-complete-guide/', nivel: 8, duracion: 13 }
      ],
      'Prisma': [
        { nombre: 'Prisma with Next.js', proveedor: 'Udemy', url: 'https://www.udemy.com/course/prisma-nextjs/', nivel: 7, duracion: 6 }
      ],
      'Jenkins': [
        { nombre: 'Jenkins - From Zero to Hero', proveedor: 'Udemy', url: 'https://www.udemy.com/course/jenkins-from-zero-to-hero/', nivel: 7, duracion: 10 },
        { nombre: 'Learn DevOps: CI/CD with Jenkins', proveedor: 'Udemy', url: 'https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/', nivel: 8, duracion: 11 }
      ],
      'GitHub Actions': [
        { nombre: 'GitHub Actions - Complete Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/github-actions-the-complete-guide/', nivel: 7, duracion: 7 }
      ],
      'Terraform': [
        { nombre: 'Terraform - Complete Course', proveedor: 'Udemy', url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/', nivel: 8, duracion: 12 },
        { nombre: 'HashiCorp Terraform Associate', proveedor: 'Udemy', url: 'https://www.udemy.com/course/terraform-associate/', nivel: 8, duracion: 14 }
      ],
      'Linux': [
        { nombre: 'Linux Mastery', proveedor: 'Udemy', url: 'https://www.udemy.com/course/linux-mastery/', nivel: 7, duracion: 11 },
        { nombre: 'Complete Linux Training', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-linux-training-course-to-get-your-dream-it-job/', nivel: 7, duracion: 17 }
      ],
      'Nginx': [
        { nombre: 'Nginx Fundamentals', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nginx-fundamentals/', nivel: 6, duracion: 3 }
      ],
      'Express.js': [
        { nombre: 'Node.js, Express, MongoDB & More', proveedor: 'Udemy', url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', nivel: 8, duracion: 42 },
        { nombre: 'Node and Express Tutorial', proveedor: 'Udemy', url: 'https://www.udemy.com/course/node-and-express-tutorial/', nivel: 7, duracion: 12 }
      ],
      'Flask': [
        { nombre: 'REST APIs with Flask and Python', proveedor: 'Udemy', url: 'https://www.udemy.com/course/rest-api-flask-and-python/', nivel: 7, duracion: 17 },
        { nombre: 'Python and Flask Bootcamp', proveedor: 'Udemy', url: 'https://www.udemy.com/course/python-and-flask-bootcamp-create-websites-using-flask/', nivel: 6, duracion: 20 }
      ],
      'C#': [
        { nombre: 'C# Basics for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/csharp-tutorial-for-beginners/', nivel: 6, duracion: 5 },
        { nombre: 'Complete C# Masterclass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-csharp-masterclass/', nivel: 7, duracion: 31 }
      ],
      'ASP.NET Core': [
        { nombre: 'Complete ASP.NET Core MVC', proveedor: 'Udemy', url: 'https://www.udemy.com/course/complete-aspnet-core-21-course/', nivel: 8, duracion: 18 },
        { nombre: 'ASP.NET Core - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/aspnet-core-the-complete-guide/', nivel: 8, duracion: 22 }
      ],
      'PHP': [
        { nombre: 'PHP for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/php-for-complete-beginners-includes-msql-object-oriented/', nivel: 6, duracion: 37 },
        { nombre: 'PHP with Laravel', proveedor: 'Udemy', url: 'https://www.udemy.com/course/php-with-laravel-for-beginners-become-a-master-in-laravel/', nivel: 7, duracion: 43 }
      ],
      'Laravel': [
        { nombre: 'Laravel - The Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/laravel-the-complete-guide/', nivel: 8, duracion: 44 },
        { nombre: 'Laravel for Beginners', proveedor: 'Udemy', url: 'https://www.udemy.com/course/laravel-for-beginners-laravel-course/', nivel: 7, duracion: 15 }
      ],
      'Go': [
        { nombre: 'Learn Go Programming - Golang', proveedor: 'Udemy', url: 'https://www.udemy.com/course/learn-how-to-code/', nivel: 7, duracion: 46 },
        { nombre: 'Go: Complete Developer Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/go-the-complete-developers-guide/', nivel: 7, duracion: 9 }
      ],
      'Swift': [
        { nombre: 'iOS & Swift - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/ios-13-app-development-bootcamp/', nivel: 8, duracion: 55 },
        { nombre: 'Swift Programming Masterclass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/swift-programming-masterclass/', nivel: 7, duracion: 34 }
      ],
      'iOS Development': [
        { nombre: 'iOS & Swift - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/ios-13-app-development-bootcamp/', nivel: 8, duracion: 55 },
        { nombre: 'iOS Development with SwiftUI', proveedor: 'Udemy', url: 'https://www.udemy.com/course/swiftui-masterclass-course-ios-development-with-swift/', nivel: 8, duracion: 40 }
      ],
      'Android Development': [
        { nombre: 'The Complete Android Kotlin Developer', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-complete-kotlin-developer-course/', nivel: 8, duracion: 33 },
        { nombre: 'Android App Development Masterclass', proveedor: 'Udemy', url: 'https://www.udemy.com/course/master-android-7-nougat-java-app-development-step-by-step/', nivel: 7, duracion: 33 }
      ],
      'Kotlin': [
        { nombre: 'The Complete Android Kotlin Developer', proveedor: 'Udemy', url: 'https://www.udemy.com/course/the-complete-kotlin-developer-course/', nivel: 8, duracion: 33 },
        { nombre: 'Kotlin for Android Development', proveedor: 'Udemy', url: 'https://www.udemy.com/course/kotlin-android-developer-masterclass/', nivel: 7, duracion: 30 }
      ],
      'Cypress': [
        { nombre: 'Cypress End-to-End Testing', proveedor: 'Udemy', url: 'https://www.udemy.com/course/cypress-end-to-end-testing/', nivel: 7, duracion: 9 },
        { nombre: 'Cypress - Modern Automation Testing', proveedor: 'Udemy', url: 'https://www.udemy.com/course/cypress-io-master-class/', nivel: 7, duracion: 12 }
      ],
      'Selenium': [
        { nombre: 'Selenium WebDriver with Java', proveedor: 'Udemy', url: 'https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/', nivel: 8, duracion: 66 },
        { nombre: 'Selenium Testing Framework', proveedor: 'Udemy', url: 'https://www.udemy.com/course/selenium-testing-framework/', nivel: 7, duracion: 14 }
      ],
      'Pytest': [
        { nombre: 'Pytest - Python Testing', proveedor: 'Udemy', url: 'https://www.udemy.com/course/pytest-complete-guide/', nivel: 7, duracion: 5 }
      ],
      'JUnit': [
        { nombre: 'JUnit & Mockito - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/junit-tutorial-for-beginners-with-java-examples/', nivel: 7, duracion: 5 }
      ],
      'Postman': [
        { nombre: 'Postman Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/postman-the-complete-guide/', nivel: 6, duracion: 14 }
      ],
      'Webpack': [
        { nombre: 'Webpack 5 - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/webpack-from-beginner-to-advanced/', nivel: 7, duracion: 6 }
      ],
      'Vite': [
        { nombre: 'Vite.js - Complete Guide', proveedor: 'Udemy', url: 'https://www.udemy.com/course/vitejs-complete-guide/', nivel: 6, duracion: 4 }
      ],
      'Comunicación': [
        { nombre: 'Communication Skills Training', proveedor: 'Udemy', url: 'https://www.udemy.com/course/communication-skills-training/', nivel: 6, duracion: 3 },
        { nombre: 'Effective Communication Skills', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/wharton-communication-skills', nivel: 6, duracion: 12 }
      ],
      'Trabajo en equipo': [
        { nombre: 'Teamwork & Collaboration', proveedor: 'Udemy', url: 'https://www.udemy.com/course/teamwork-collaboration/', nivel: 5, duracion: 2 },
        { nombre: 'Building High-Performance Teams', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/high-performing-teams', nivel: 6, duracion: 8 }
      ],
      'Liderazgo': [
        { nombre: 'Leadership Skills Training', proveedor: 'Udemy', url: 'https://www.udemy.com/course/leadership-skills/', nivel: 7, duracion: 3 },
        { nombre: 'Inspirational Leadership', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/leadership-skills', nivel: 7, duracion: 16 }
      ],
      'Resolución de problemas': [
        { nombre: 'Problem Solving & Decision Making', proveedor: 'Udemy', url: 'https://www.udemy.com/course/problem-solving-decision-making/', nivel: 6, duracion: 2 },
        { nombre: 'Creative Problem Solving', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/creative-problem-solving', nivel: 6, duracion: 10 }
      ],
      'Pensamiento crítico': [
        { nombre: 'Critical Thinking Skills', proveedor: 'Udemy', url: 'https://www.udemy.com/course/critical-thinking-skills/', nivel: 6, duracion: 3 },
        { nombre: 'Critical Thinking & Problem Solving', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/critical-thinking-problem-solving', nivel: 6, duracion: 8 }
      ],
      'Adaptabilidad': [
        { nombre: 'Adaptability & Resilience', proveedor: 'Udemy', url: 'https://www.udemy.com/course/adaptability-resilience/', nivel: 5, duracion: 2 },
        { nombre: 'Leading Change & Innovation', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/leading-innovation', nivel: 6, duracion: 12 }
      ],
      'Gestión del tiempo': [
        { nombre: 'Time Management Mastery', proveedor: 'Udemy', url: 'https://www.udemy.com/course/time-management-mastery/', nivel: 6, duracion: 3 },
        { nombre: 'Work Smarter, Not Harder', proveedor: 'Coursera', url: 'https://www.coursera.org/learn/work-smarter-not-harder', nivel: 6, duracion: 8 }
      ]
    };
  }

  async poblarCursosIniciales() {
    console.log('Poblando cursos en base de datos...');
    let cursosCreados = 0;
    let cursosExistentes = 0;

    for (const [topic, cursos] of Object.entries(this.catalogoCursos)) {
      for (const cursoData of cursos) {
        const existe = await this.prisma.curso.findFirst({
          where: { url: cursoData.url },
        });

        if (!existe) {
          await this.prisma.curso.create({
            data: {
              nombre: cursoData.nombre,
              proveedor: cursoData.proveedor,
              url: cursoData.url,
              nivel: cursoData.nivel,
              duracion: cursoData.duracion,
            },
          });
          cursosCreados++;
          console.log(`Creado: ${cursoData.nombre} (${topic})`);
        } else {
          cursosExistentes++;
        }
      }
    }

    console.log(`Poblado completado: ${cursosCreados} nuevos, ${cursosExistentes} ya existían`);
    return { cursosCreados, cursosExistentes };
  }

  async buscarCursosPorHabilidad(nombreHabilidad: string) {
    // Buscar cursos cuyo nombre contenga la habilidad
    const cursos = await this.prisma.curso.findMany({
      where: {
        OR: [
          { nombre: { contains: nombreHabilidad, mode: 'insensitive' } },
          { url: { contains: nombreHabilidad, mode: 'insensitive' } },
        ],
      },
      take: 3,
    });

    return cursos;
  }
}
