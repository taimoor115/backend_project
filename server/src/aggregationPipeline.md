# Find count of female users in Db
[
  {
    $match: {
      gender:"female"
    }
  }, 
  {
    $count: "femaleUsers"
  }

]

# Find the average age of users
[
  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age"
      }
    }
  }
]

# Find the average of users based on their genders

[
  {
    $group: {
      _id: "$gender",
      averageAge: {
        $avg: "$age"
      }
    }
  }
]


# Top 5 liked fruit
[
  {
  	$group: {
  	  _id: "$favoriteFruit",
			countPeople: {
        $sum:1
      }  	 
  	}
  }, 
  {
    $sort: {
      count:1
    }
  },
  {
    $limit: 5
  }
]


# Total user based on gender
[
  {
   $group: {
     _id: "$gender",

     genderCount: {
       $sum:1
     }
   }
  },

]

# Top country registered users
[
  {
    $group: {
      _id: "$company.location.country",
      users: {
        $sum:1
      }
    }
  },
  {
    $sort: {
      users: -1
    }
  },
  {
    $limit: 1
  }
]


# Unique eyeColor users
[
  {
    $group: {
      _id: "$eyeColor",

      users: {
        $sum:1
      }
     
    }
  },
 
]


# Average of number of tags
## 1st way
[
  {
    $unwind: "$tags",
  },

  {
    $group: {
      _id: "$_id",
       totalNumberOfTags: {
         $sum:1,
       },
    }
  },
  {
    $group: {
      _id: null,
      averageNumberOfTags: {
        $avg: "$totalNumberOfTags"
      }
    }
  }
]

## 2nd way
[
  {
    $addFields: {
      totalNumberOfTags:{
        $size: {
          $ifNull: ["$tags", []]
        }
      }
    }
  },

  {
    $group: {
			_id: null,

      averageOfTags: {
        	$avg: "$totalNumberOfTags"
      }
  	}
  }
]



# Find user with atleast one enim tag

[
  {
    $match: {
      tags: "enim"
    }
  },
  {
    $count: 'userWithAtLeastEnimTag'
  }
]

# Find the name and age of users of status isActive false and have velit in their tags
[
  {
    $match: {
      tags: "velit", isActive: false
    }
  },

  {
    $project: {
      name:1, age:1
    }
  }
]


# Find number of users whose phone# start with the +1 (940)
[
  {
    $match: {
      "company.phone" : /^\+1 \(940\)/
    }
  },
  {
    $count: "usersPhoneStartWith+1(940)"
  }
]


# Find the user who registered most recent? Give its name, registeration data and fav. fruit
[
  {
    $sort: {
      registered: -1
    },
  },
  {
    $limit: 4,
  },
  {
    $project: {
      name:1,
      registered:1,
      favoriteFruit: 1
    }
  }
]


# Categorized users based on fav.fruit
[
  {
    $group: {
      _id: "$favoriteFruit",
      users: {
        $push: "$name"
      }
    }
  }
]

# How many of user which have ad as the second tag 
[
  {
    $match: {
      "tags.1": 'ad'
    },
  },
  {
   	$count: 'users' 
  }
]



# Find all users which have id and enim in their tags
[
  {
    $match: {
      tags: {
        $all: ["enim", "id"]
      }
    }
  }
]


# List of all companies in usa and their corresponding users 

[
  {
    $match: {
     "company.location.country": "USA"
    }
  },

  {
    $group: {
      _id: "$company.title",

      users: {
        $sum: 1
      }
    }
  }
]


# Joins
[
  {
    $lookup: {
      from: "author",
      localField: "author_id",
      foreignField: "_id",
      as: "result"
    }
  }
]


[
  {
    $lookup: {
      from: "author",
      localField: "author_id",
      foreignField: "_id",
      as: "result"
    }
  }, 
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$result", 0]
      }
    }
  }
]