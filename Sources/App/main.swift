import Vapor
import Foundation

let drop = Droplet()

drop.post("leaf/save") { request in
    guard let leaf = request.data["leaf"]?.string else {
        return try JSON(node: ["result": "failed to find leaf string"])
    }
    do {
        try leaf.write(toFile: drop.resourcesDir + "/Views/written.leaf", atomically: false, encoding: String.Encoding.utf8)
    } catch {
        print("could not write leaf")
    }
    return try JSON(node: ["result", "successfully wrote leaf file"])
}

drop.get { req in
    do {
        let directoryContents = try FileManager.default.contentsOfDirectory(atPath: drop.resourcesDir + "/Views/")
        let node = try directoryContents.makeNode()
        let editorContent = try drop.view.make("written").makeBytes()
        let file = try String(contentsOfFile: drop.resourcesDir + "/Views/written.leaf", encoding: String.Encoding.utf8)
        
        return try drop.view.make("written", [
            "messages": node,
            "editorContent" : file
        ])
        
    } catch {
        print("failed to read leaf files or written.leaf")
    }
    
    return try drop.view.make("welcome", [
        "message": Node([])
    ])
}

drop.resource("posts", PostController())
drop.run()





