import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart';

class GetYoGirlAGiftClient
{
	final int _okStatusCode = 200;
	final int _createdCode = 201;
	final int _noContentStatusCode = 204;

	Uri baseAddress;

	GetYoGirlAGiftClient(Uri baseAddress)
	{
		this.baseAddress = baseAddress;
	}

	Future<String> getToken() async
	{
		Map<String, String> body = {'username': 'ApiAccess', 'password': 'ApiAccessPassword', 'grant_type': 'password'};
		Response response = await post(baseAddress.replace(path: "/token"), body: body);

		// Make sure the request succeeded.
		if(response.statusCode != _okStatusCode)
			throw new Exception("Token request failed.");

		dynamic parsed = json.decode(response.body);
		return parsed['access_token'];		
	}

	Future<User> login(String token, String username, String password) async
	{
		String body = json.encode({"Username": username, "Password": password});		
		Response response = await post(baseAddress.replace(path: '/api/users/login'), headers: _createHeaders(token), body: body);

		// Make sure the request succeeded.
		if(response.statusCode != _okStatusCode)
			throw new Exception("Login request failed.");

		dynamic parsed = json.decode(response.body);
		
		// An object will be returned with a success property and a user property if we successfully logged in.
		if(parsed['Success'])
			return new User._fromJson(parsed['User']);

		// Login failed.
		return null;
	}

	Future<Girl> addGirl(String token, Girl girl) async
	{
		String body = _createBodyString(girl);
		Response response = await post(baseAddress.replace(path: '/api/girls'), headers: _createHeaders(token), body: body);
		
		// Make sure the request succeeded.
		if(response.statusCode != _createdCode)
			throw new Exception("Add girl request failed.");
		
		dynamic parsed = json.decode(response.body);
		return Girl._fromJson(parsed);
	}

	Future updateGirl(String token, Girl girl) async
	{
		String body = _createBodyString(girl);
		Response response = await put(baseAddress.replace(path: '/api/girls', queryParameters: {'id': girl.id.toString()}), headers: _createHeaders(token), body: body);

		// Make sure the request did not fail.
		if(response.statusCode != _noContentStatusCode)
			throw new Exception("Update girl request failed.");
	}

	Future deleteGirl(String token, int girlId) async
	{
		Response response = await delete(baseAddress.replace(path: '/api/girls', queryParameters: {'id': girlId.toString()}), headers: _createHeaders(token));

		// Make sure the request did not fail.
		if(response.statusCode != _okStatusCode)
			throw new Exception("Update girl request failed.");
	}

	Future<Rating> evaluateGift(String token, int girlId, Uint8List giftImage) async
	{
		String body = json.encode({"ImageBytes": giftImage});
		Response response = await post(baseAddress.replace(path: '/api/gifts', queryParameters: {"girlId": girlId.toString()}), headers: _createHeaders(token), body: body);

		if(response.statusCode != _okStatusCode)
			throw new Exception("Evaluate gift request failed.");

		dynamic parsed = json.decode(response.body);
		return Rating._fromJson(parsed);
	}

	Map<String, String> _createHeaders(String token)
	{
		Map<String, String> headers = {"Authorization": "bearer " + token, "Content-Type": "application/json"};
		return headers;
	}

	String _createBodyString(Object body)
	{
		return json.encode(body, toEncodable: (dynamic toEncode) => toEncode._toJson());
	}
}

enum Relationship
{
	Wife,
	Girlfriend,
	Sister,
	Mother,
	Grandmother,
	Daughter,
	Granddaughter,
	Friend,
	Cousin,
	Aunt,
	Niece,
	Other
}

class Girl
{
	int id;
	int userId;
	Relationship relationship;
	String name;
	List<GirlImage> images;
	List<ImportantDate> importantDates;
	List<Interest> interests;

	Girl()
	{
		id = 0;
		userId = 0;
		relationship = Relationship.Girlfriend;
		name = "";
		images = new List<GirlImage>();
		importantDates = new List<ImportantDate>();
		interests = new List<Interest>();
	}

	Girl._fromJson(dynamic json)
	{
		id = json['Id'];
		userId = json['UserId'];
		relationship = Relationship.values[json['Relationship']];
		name = json['Name'];

		Iterable jsonImages = json['Images'];
		images = jsonImages.map((dynamic model) => GirlImage._fromJson(model)).toList();

		Iterable jsonImportantDates = json['ImportantDates'];
		importantDates = jsonImportantDates.map((dynamic model) => ImportantDate._fromJson(model)).toList();

		Iterable jsonInterests = json['Interests'];
		interests = jsonInterests.map((dynamic model) => Interest._fromJson(model)).toList();
	}

	Map<String, dynamic> _toJson()
	{
		Map<String, dynamic> girlMap = 
		{
			"Id": id,
			"UserId": userId,
			"Relationship": relationship.index,
			"Name": name,
			"Images": images,//json.encode(images, toEncodable: (dynamic image) => image._toJson()),
			"ImportantDates": importantDates,//json.encode(importantDates, toEncodable: (dynamic importantDate) => importantDate._toJson()),
			"Interests": interests//json.encode(interests, toEncodable: (dynamic interest) => interest._toJson())
		};

		return girlMap;
	}
}

class GirlImage
{
	int id;
	Uint8List image;

	GirlImage()
	{
		id = 0;
	}

	GirlImage._fromJson(dynamic json)
	{
		id = json['id'];
		image = base64Decode(json['Image']);
	}

	Map<String, dynamic> _toJson()
	{
		Map<String, dynamic> girlImageMap = 
		{
			"Id": id,
			"Image": image
		};

		return girlImageMap;
	}
}

class ImportantDate
{
	int id;
	DateTime date;
	String occassion;

	ImportantDate()
	{
		id = 0;
	}

	ImportantDate._fromJson(dynamic json)
	{
		id = json['Id'];
		date = DateTime.parse(json['Date']);
		occassion = json['occassion'];
	}

	Map<String, dynamic> _toJson()
	{
		Map<String, dynamic> importantDateMap =
		{
			"Id": id,
			"Date": date,
			"Occasion": occassion
		};

		return importantDateMap;
	}
}

class Interest
{
	int id;
	String value;

	Interest()
	{
		id = 0;
	}

	Interest._fromJson(dynamic json)
	{
		id = json['id'];
		value = json['value'];
	}

	Map<String, dynamic> _toJson()
	{
		Map<String, dynamic> interestMap =
		{
			"Id": id,
			"Value": value
		};

		return interestMap;
	}
}

class User
{
	int id;
	String username;
	String password;
	String email;
	bool isEmailVerified;
	List<Girl> girls;

	User()
	{
		id = 0;
		isEmailVerified = false;
		girls = new List<Girl>();
	}

	User._fromJson(dynamic json)
	{
		id = json['Id'];
		username = json['Username'];
		password = json['Password'];
		email = json['Email'];
		isEmailVerified = json['IsEmailVerified'];

		Iterable jsonGirls = json['Girls'];
		girls = jsonGirls.map((dynamic model) => Girl._fromJson(model)).toList();
	}

	Map<String, dynamic> _toJson()
	{
		Map<String, dynamic> userMap =
		{
			"Id": id,
			"Username": username,
			"Password": password,
			"Email": email,
			"IsEmailVerified": isEmailVerified,
			"Girls": json.encode(girls, toEncodable: (dynamic girl) => girl._toJson()) 
		};

		return userMap;
	}
}

class Rating
{
	double likability;
	double returnChance;
	double friendsJealousy;
	double overall;

	Rating._fromJson(dynamic json)
	{
		likability = json['Likability'];
		returnChance = json['ReturnChance'];
		friendsJealousy = json['FriendsJealousy'];
		overall = json['Overall'];
	}
}