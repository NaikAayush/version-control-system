export class Repository {
  public name: String;
  public description!: String;
  public url!: String;
  public createTimeStamp!: any;
  public visibility: String;
  public ownerId: String;
  public ownerName: String;

  constructor(
    name: String,
    visibility: String,
    ownerId: String,
    ownerName: String,
    description?: String,
    createTimeStamp?: any
  ) {
    this.name = name;
    this.visibility = visibility;
    this.ownerId = ownerId;
    this.ownerName = ownerName;

    this.createUrl(ownerName, name);

    if (description) {
      this.description = description;
    }
    if (!description) {
      this.description = "";
    }
    if (createTimeStamp) {
      this.createTimeStamp = createTimeStamp;
    }
  }
  createUrl(ownerName: String, repoName: String) {
    const bucketUrl =
      "https://console.cloud.google.com/storage/browser/version-control-system-ooad.appspot.com/version-control-system-ooad.appspot.com";
    this.url = bucketUrl + "/" + ownerName + "/" + repoName;
  }
  toJSON() {
    return {
      name: this.name,
      visibility: this.visibility,
      ownerId: this.ownerId,
      ownerName: this.ownerName,
      description: this.description,
      createTimeStamp: this.createTimeStamp,
    };
  }
}
