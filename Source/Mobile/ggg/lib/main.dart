import 'package:flutter/material.dart';
import 'package:ggg/get_yo_girl_a_gift.dart';
import 'package:ggg/pages/loading.dart';
import 'package:ggg/pages/login.dart';
import 'package:ggg/pages/girlslist.dart';
import 'package:ggg/pages/profile.dart';
import 'package:ggg/pages/add.dart';
import 'package:ggg/pages/camera.dart';
import 'package:ggg/pages/feedbackpage.dart';
import 'package:ggg/pages/signup.dart';
import 'package:ggg/pages/user.dart';

void main() => runApp(MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => Loading(),
    '/login': (context) => Login(),
    '/signup': (context) => SignUp(),
    '/girlslist': (context) => GirlsList(),
    '/profile': (context) => Profile(),
    '/add': (context) => Add(),
    '/camera': (context) => Camera(),
    '/feedbackpage': (context) => FeedbackPage(),
    '/user': (context) => UserScreen(),
  },

));