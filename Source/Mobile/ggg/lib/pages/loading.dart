import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Loading extends StatefulWidget {
  @override
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  void testLoad() async{

    // simulate network request for a username
    String username = await Future.delayed(Duration(seconds: 4), () {
      return 'test';
    });

    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  void initState() {
    super.initState();
    testLoad();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      body: Center(
        child: SpinKitFadingCircle(
          color: Colors.red,
          size: 100.0,
        ),
      ),
    );
  }
}
