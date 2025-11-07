<h1 align="center">
  <br>
  <img width="150" src="https://user-images.githubusercontent.com/5698566/230345149-ef757e51-6eb9-479d-94f5-a13e4ad33b03.png">
  <br>
  Kasm Workspaces Registry
  <br>
</h1>

## Contents

1. [Creating Workspaces](#5-creating-workspaces)
   - [Folder structure](#folder-structure)
   - [Schema](#schema)
   - [New schema version](#new-schema-version)
1. [Discovery](#6-dicovery)


&nbsp;

## 1. Creating workspaces

Once you are ready to upload your workspaces, head back to the **Code** tab. You can either continue using the online editor or you might find it easier to clone the repository and work on a local copy, it's up to you. For this example we will continue with the online editor.

### Folder structure

![workspaces-800](https://user-images.githubusercontent.com/5698566/230384525-d8577582-fab7-4850-979d-d75e83503022.gif)

All workspaces reside in the **workspaces** folder

You will need to create a folder and the necessary files using the following format:

```
Workspace Name
- workspace.json
- workspace-name.png
```

![add-workspace-800](https://user-images.githubusercontent.com/5698566/230386427-c2221647-ce30-4c2e-bc92-e83481d1b8ba.gif)

**Folder name** - The folder name can be whatever it needs to be. You probably want to stay clear of special characters to be on the safe side, but spaces should be fine.

**workspace.json** - This is a JSON file with all the parameters you want to be sent to Kasm Workspaces when it builds the container. You can see the valid paramaters in the schema section and whether they are required or not.

```
{
  "description": "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
  "docker_registry": "https://index.docker.io/v1/",
  "image_src": "vs-code.png",
  "categories": [
    "Development"
  ],
  "friendly_name": "Visual Studio Code",
  "architecture": [
    "amd64",
    "arm64"
  ],
  "compatibility": [
    {
      "version": "1.16.x",
      "image": "kasmweb/vs-code:1.16",
      "uncompressed_size_mb": 2428,
      "available_tags": [
        "develop",
        "1.16.0"
      ]

    },
    {
      "version": "1.17.x",
      "image": "kasmweb/vs-code:1.17",
      "uncompressed_size_mb": 2528,
      "available_tags": [
        "develop",
        "1.17.0"
      ]
    }
  ]
}
```

**Image file** - The image can be `.png` or `.svg` and ideally will be square and at least 50 x 50px. If you use the workspace builder on your registry store front it will try to normalise everything to make it simpler.

Don't forget to commit your changes!

### Schema

**Version** 1.1

| Property              | Required | Type | Description |
| --------------------- | -------- | --- | --- |
| friendly_name         | True     | String | The name to show                                                                                     |
| description           | True     | String | A short description of the workspace                                                                 |
| image_src             | True     | String | The name of the workspace icon used                                                                  |
| architecture          | True     | Array | Json list containing either "amd64", "arm64" or both                                                 |
| compatability         | True     | Array | A list of Kasm versions the workspace should work with                                               |
| categories            | False    | Array | Json list containing the categories the workspace belongs too. This should be limited to a max of 3. |
| docker_registry       | False    | String | Which docker registry to use                                                                         |
| run_config            | False    | Object | Any additional parameters to add to the run config                                                   |
| exec_config           | False    | Object | Any additional parameters to add to the exec config                                                  |
| notes                 | False    | String | Notes about running the workspace, such as if it requires libseccomp.                                |
| cores                 | False    | Integer | Specify the amount of cores to use for this workspace                                                |
| memory                | False    | Integer | Specify the amount of memory to use for this workspace                                               |
| gpu_count             | False    | Integer | Specify the amount of GPUs to use for this workspace                                                 |
| cpu_allocation_method | False    | String | What CPU allocation method to use for this workspace. Can be either "Inherit", "Quotas" or "Shares"  |

The compatibility property is an array of objects and needs a bit more explanation
```json
  "compatibility": [
    {
      "version": "1.16.x",
      "image": "kasmweb/chromium:1.16.0-rolling-daily",
      "uncompressed_size_mb": 2643,
      "available_tags": [
        "develop",
        "1.16.0",
        "1.16.0-rolling-weekly",
        "1.16.0-rolling-daily"
      ]
    }
  ]
```
* **version** - This is the version of kasm the entry is compatible with
* **image** - The docker image. The tag is included for things like estimating the size and is used if there are no available_tags.
* **uncompressed_size_mb** - Integer of the approximate size of the workspace when it’s uncompressed in MB. This doesn’t take into account layers. For example if an image is 2.46GB you would enter 2460
* **available_tags** - These values are what will determine the available "channels" on the front end. If you don't want/need channels, remove the available_tags section completely. You shouldn't mix and match though, if you specify available_tags for 1 workspace, it should be specified for all of them. That doesn't mean every workspace has to have all the same tags, if a workspace only has develop tags then it will only show when develop is the selected channel. 

Head to the **Actions** tab to check your progress and once `Page build and deployment` is complete, your site should be ready.

### New Kasm Workspaces version

When a new version of Kasm is released then a new entry needs to be added to the compatibility list to support it. If you have a lot of workspaces defined then there are a couple of scripts included that can help.

Go to the processing folder and edit add_next_version.js changing the `baseversion` to match the new version. Also make sure the rest of the file matches your setup, if you anre't using channels then completely remove the `available_tags` section.

Then in a terminal run

```
cd processing
npm install
node add_next_version.js
```

This will add a new entry for every single workspace, but the size will be set to 0, this is so you can run the `get_image_sizes.js` script. This will loop through each `image` that has an uncompressed_size_mb of 0 and will pull the image, get the size, update the workspace json and remove the image. 

This can take a long time if you have a lot of workspaces and dependng on their sizes, but if the script crashes out, you can just start it agin and it will carry on from where it left off. 

```
node add_next_version.js
```

### New schema version

When a new schema version comes out, you just need to create a new branch that reflects the new schema, for example `1.2` and make it the default branch.

In the new branch, make any updates that are needed, when the changes are committed a new version will be built.

Kasm Workspaces will automatically pull the version of the schema that it understands.

If only the latest version is building (so 1.1 works but 1.0 doesn't), open build_all_branches.sh, search for `echo "All branches:` and check if there is `git fetch --all` on the line underneath, if not, add it, this will need to be added to the 1.0 branch as well if it's missing, otherwise if you make a change to 1.0 (for kasm versions 1.12.x - 1.15.x) it won't build all the branches.

## Channels
Schema 1.1 added the concept of channels. Each registry can specify the channels they support, these are defined by the tags an image has. For example you might have develop, 1.16.0 and 1.16.0-rolling-daily. When the registry json is built it loops through all the workspaces and generates a list of all the possible "Channels" (tags) that are listed in compatibility.available_tags. Available tags is an optional list, if you don't include it on any of the workspaces then your registry will work as before without presenting the end user with a channels option. You shouldn't mix and match though, if you add available tags to 1 workspace, you should add available tags to all workspaces.

If you are using channels, update processing/processjson.js and specify the `default_channel` such as `'develop'`. If you aren't using channels you don't need to do anything, it will automatically detect there are no channels and set the correct value.

&nbsp;

## 2. Discovery

The tag below will hopefully make it easier for people to find your Workspace Registry by clicking on [this github search link](https://github.com/search?q=in%3Areadme+sort%3Aupdated+-user%3Akasmtech+%22KASM-REGISTRY-DISCOVERY-IDENTIFIER%22&type=repositories). If you want to make it harder to find your repository for some reason, just remove this section.

If you are the one doing the searching, click on the **site** folder, then click on **next.config.js** and the url can be found under **env.listUrl**

![search-600](https://user-images.githubusercontent.com/5698566/230614274-2976b4d7-074f-4e6d-9e58-e4d2512a3d2a.gif)

KASM-REGISTRY-DISCOVERY-IDENTIFIER