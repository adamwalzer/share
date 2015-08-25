var profilePicturesStore = new FS.Store.GridFS("profile-pictures");

ProfilePictures = new FS.Collection("profile-pictures", {
  stores: [profilePicturesStore]
});

ProfilePictures.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

ProfilePictures.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});