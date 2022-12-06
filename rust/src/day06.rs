use std::collections::HashSet;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use std::path::Path;

fn lines_from_file(filename: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(filename).expect("no such file");
    let buf = BufReader::new(file);
    buf.lines()
        .map(|l| l.expect("Could not parse line"))
        .collect()
}

fn find_unique_packet(packet: &String, packet_length: usize) -> usize {
    let mut index = 0;
    while index < packet.len() {
        let characters_set: HashSet<char> =
            HashSet::from_iter(packet.chars().skip(index).take(packet_length));
        if characters_set.len() == packet_length {
            return index + packet_length;
        }

        index += 1;
    }
    index
}

fn main() {
    let file_path = "../2022/input6.txt";
    let lines = lines_from_file(file_path);

    for line in lines {
        let packet_marker = find_unique_packet(&line, 4);
        println!("Packet: {:?} Marker: {:?}", line, packet_marker);

        let message_marker = find_unique_packet(&line, 14);
        println!("Part 1: {packet_marker}");
        println!("Part 2: {message_marker}");
    }
}
