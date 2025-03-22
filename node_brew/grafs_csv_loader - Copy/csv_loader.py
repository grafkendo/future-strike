import csv
import os
import folder_paths
import torch
import numpy as np

class GrafsCSVLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "csv_path": ("STRING", {"default": "prompts.csv"}),
                "row_index": ("INT", {"default": 0, "min": 0, "max": 1000})
            }
        }
    
    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("PROMPT", "FILENAME", "NEGATIVE")
    FUNCTION = "load_csv_row"
    CATEGORY = "Grafs/CSV"

    def load_csv_row(self, csv_path, row_index):
        try:
            with open(csv_path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                headers = next(reader)  # Skip header row
                
                # Go to specified row
                for i, row in enumerate(reader):
                    if i == row_index:
                        prompt = row[0] if len(row) > 0 else ""
                        filename = row[1] if len(row) > 1 else ""
                        negative = row[2] if len(row) > 2 else ""
                        return (prompt, filename, negative)
                
                return ("Row not found", "error", "")
                
        except Exception as e:
            print(f"Error loading CSV: {str(e)}")
            return ("Error loading CSV", "error", "")


class CSVRowCount:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "csv_path": ("STRING", {"default": "prompts.csv"}),
                "delimiter": (["comma", "semicolon", "tab"], {"default": "comma"})
            }
        }
    
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("ROW_COUNT",)
    FUNCTION = "count_rows"
    CATEGORY = "utils/loaders"
    
    def count_rows(self, csv_path, delimiter):
        delimiters = {"comma": ",", "semicolon": ";", "tab": "\t"}
        delimiter_char = delimiters[delimiter]
        
        # Try to find the CSV file in various locations
        csv_file_path = csv_path
        if not os.path.exists(csv_file_path):
            # Try in the ComfyUI root directory
            comfy_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            csv_file_path = os.path.join(comfy_dir, csv_path)
            
            # If still not found, try in the output directory
            if not os.path.exists(csv_file_path):
                output_dir = folder_paths.get_output_directory()
                csv_file_path = os.path.join(output_dir, csv_path)
        
        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file, delimiter=delimiter_char)
                next(reader)  # Skip header
                row_count = sum(1 for _ in reader)
                print(f"CSV file contains {row_count} rows (excluding header)")
                return (row_count,)
        except Exception as e:
            print(f"Error counting CSV rows: {str(e)}")
            return (0,)


# Node to create a simple CSV file with example data
class CreateExampleCSV:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "output_path": ("STRING", {"default": "prompts.csv"}),
                "num_examples": ("INT", {"default": 3, "min": 1, "max": 10})
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("CSV_PATH",)
    FUNCTION = "create_csv"
    CATEGORY = "utils/loaders"
    
    def create_csv(self, output_path, num_examples):
        # Example prompts for cyberpunk images
        examples = [
            ["Generate a dark street scene with a skilled net runner climbing a rusted fire escape ladder", "street_runner", "daylight, bright colors, clean aesthetic"],
            ["A cyberpunk hacker's den with multiple holographic displays and neon lighting", "hacker_den", "daylight, modern clean office, minimalist"],
            ["Aerial view of a dystopian megacity at night with towering corporate structures", "megacity", "sunny day, clean streets, natural landscape"],
            ["Close-up of a cybernetic implant with glowing circuits and exposed wiring", "implant", "medical setting, sterile environment, daylight"],
            ["Underground black market with vendors selling illegal tech under flickering lights", "black_market", "shopping mall, bright lighting, clean floors"],
            ["Rogue AI visualization as a glitching digital face on multiple screens", "rogue_ai", "simple interface, clean design, minimal"],
            ["Cyberpunk street food vendor with steam and neon signs in the rain", "street_food", "clean restaurant, daylight, modern setting"],
            ["Corporate assassin with cybernetic enhancements in a neon-lit alley", "assassin", "office worker, bright setting, clean clothes"],
            ["Data courier running through crowded streets with neural data implant glowing", "data_courier", "casual walking, daylight, peaceful scene"],
            ["Abandoned server farm with old hardware repurposed by netrunners", "server_farm", "modern data center, clean, organized racks"]
        ]
        
        # Determine output location
        output_dir = folder_paths.get_output_directory()
        csv_file_path = os.path.join(output_dir, output_path)
        
        try:
            with open(csv_file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                # Write header
                writer.writerow(["prompt", "filename", "negative"])
                # Write example rows
                for i in range(min(num_examples, len(examples))):
                    writer.writerow(examples[i])
            
            print(f"Created example CSV file at {csv_file_path} with {num_examples} examples")
            return (csv_file_path,)
        except Exception as e:
            error_msg = f"Error creating CSV: {str(e)}"
            print(error_msg)
            return (error_msg,)


class CreateImageListCSV:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "output_path": ("STRING", {"default": "image_requirements.csv"})
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("CSV_PATH",)
    FUNCTION = "create_csv"
    CATEGORY = "utils/loaders"
    
    def create_csv(self, output_path):
        # List of required images with descriptions
        images = [
            ["Image Name", "Format", "Scene Description"],
            ["lastbkp", "webp", "Default story image"],
            ["apartment", "png", "Starting scene - Simple job setup"],
            ["street", "png", "Street level scene with crowds"],
            ["market", "png", "Night Market with illegal tech trades"],
            ["network", "png", "Hidden network visualization"],
            ["revolution", "png", "Public revolution ending"],
            ["profit", "png", "Profit ending scene"],
            ["keeper", "png", "Secret keeper ending"],
            ["tunnels", "png", "Underground maintenance tunnels"],
            ["rooftops", "png", "Rooftop navigation scene"],
            ["side_street", "png", "Narrow side street scene"],
            ["fence", "png", "Data fence's booth"],
            ["corp_blend", "png", "Corporate zone blending scene"],
            ["back_alley", "png", "Dangerous back alley"],
            ["rooftop_escape", "png", "Rooftop escape sequence"],
            ["quick_climb", "png", "Fast climbing scene"],
            ["careful_climb", "png", "Methodical climbing scene"],
            ["desperate_jump", "png", "Desperate rooftop jump"],
            ["maintenance_hideout", "png", "Maintenance tunnel hideout"],
            ["deep_maintenance", "png", "Deep maintenance tunnels"],
            ["maintenance_ambush", "png", "Maintenance tunnel ambush"],
            ["maintenance_exit", "png", "Maintenance exit scene"],
            ["spiderbot_hack", "png", "Spiderbot hacking scene"],
            ["spiderbot_chase", "png", "Spiderbot chase sequence"],
            ["gang_confrontation", "png", "Gang confrontation scene"],
            ["gang_negotiate", "png", "Gang negotiation scene"],
            ["gang_combat", "png", "Gang combat scene"],
            ["oracle_apology", "png", "Oracle apology scene"],
            ["oracle_surge", "png", "Oracle power surge scene"],
            ["recovery_hideout", "png", "Recovery hideout scene"],
            ["creator_inquiry", "png", "Creator investigation scene"],
            ["chen_lab", "png", "Dr. Chen's laboratory"],
            ["main_terminal", "png", "Main terminal access"],
            ["data_download", "png", "Data download sequence"],
            ["alternative_exit", "png", "Alternative escape route"],
            ["deep_underground", "png", "Deep underground scene"],
            ["resistance_strategy", "png", "Resistance planning scene"],
            ["recruit_allies", "png", "Ally recruitment scene"],
            ["final_preparations", "png", "Final mission prep"],
            ["operation_begins", "png", "Operation start scene"],
            ["server_approach", "png", "Server room approach"],
            ["digital_battle", "png", "Digital combat scene"],
            ["upload_complete", "png", "Upload completion scene"],
            ["public_revolution", "png", "Public revolution ending"],
            ["secret_keeper", "png", "Secret keeper ending"],
            ["network_ending", "png", "Network distribution ending"],
            ["merge_ending", "png", "Consciousness merge ending"],
            ["storage", "png", "Storage room scene"],
            ["crate", "png", "Hiding crate scene"],
            ["security_gate", "png", "Security gate scene"],
            ["brute_force", "png", "Brute force hacking"],
            ["social_engineering", "png", "Social engineering scene"],
            ["physical_key", "png", "Physical key usage"],
            ["drone_escape", "png", "Drone escape sequence"],
            ["stakeout", "png", "Stakeout scene"],
            ["street_fight", "png", "Street combat scene"],
            ["exec_plant", "png", "Executive plant scene"],
            ["shop_escape", "png", "Shop escape sequence"],
            ["start", "png", "Story start scene"],
            ["worker", "png", "Worker route scene"]
        ]
        
        # Determine output location
        output_dir = folder_paths.get_output_directory()
        csv_file_path = os.path.join(output_dir, output_path)
        
        try:
            with open(csv_file_path, 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                # Write all rows
                for row in images:
                    writer.writerow(row)
            
            print(f"Created image requirements CSV at {csv_file_path}")
            return (csv_file_path,)
        except Exception as e:
            error_msg = f"Error creating CSV: {str(e)}"
            print(error_msg)
            return (error_msg,)


class GrafsImagePromptCSV:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "csv_path": ("STRING", {"default": "image_requirements.csv"}),
                "base_prompt": ("STRING", {"default": "cyberpunk style, detailed, high quality"}),
                "base_negative": ("STRING", {"default": "text, watermark, blurry, low quality"})
            }
        }
    
    RETURN_TYPES = ("STRING", "STRING", "STRING", "INT")
    RETURN_NAMES = ("PROMPT", "FILENAME", "NEGATIVE", "ROW_COUNT")
    FUNCTION = "process_csv"
    CATEGORY = "Grafs/CSV"
    
    def process_csv(self, csv_path, base_prompt, base_negative):
        try:
            with open(csv_path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                headers = next(reader)  # Skip header row
                
                # Read all rows into a list
                rows = list(reader)
                row_count = len(rows)
                
                if row_count > 0:
                    # Get the first row to start with
                    row = rows[0]
                    image_name = row[0] if len(row) > 0 else ""
                    format = row[1] if len(row) > 1 else "png"
                    description = row[2] if len(row) > 2 else ""
                    
                    # Combine description with base prompt
                    full_prompt = f"{description}, {base_prompt}"
                    filename = f"{image_name}.{format}"
                    
                    print(f"Processing image: {filename}")
                    print(f"Full prompt: {full_prompt}")
                    
                    return (full_prompt, filename, base_negative, row_count)
                
                return ("No rows found", "error.png", base_negative, 0)
                
        except Exception as e:
            print(f"Error processing CSV: {str(e)}")
            return ("Error processing CSV", "error.png", base_negative, 0)


class GrafsBatchImageGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "csv_path": ("STRING", {"default": "image_requirements.csv"}),
                "base_prompt": ("STRING", {"default": "cyberpunk style, detailed, high quality, 8k"}),
                "base_negative": ("STRING", {"default": "text, watermark, blurry, low quality, bad anatomy"}),
                "current_index": ("INT", {"default": 0, "min": 0, "max": 1000}),
                "trigger": ("INT", {"default": 0})  # Added trigger input for loop
            }
        }
    
    RETURN_TYPES = ("STRING", "STRING", "STRING", "INT", "INT", "BOOLEAN")
    RETURN_NAMES = ("PROMPT", "FILENAME", "NEGATIVE", "NEXT_INDEX", "TOTAL_ROWS", "CONTINUE")
    FUNCTION = "process_batch"
    CATEGORY = "Grafs/CSV"
    
    def process_batch(self, csv_path, base_prompt, base_negative, current_index, trigger):
        try:
            with open(csv_path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                headers = next(reader)  # Skip header
                rows = list(reader)
                total_rows = len(rows)
                
                if current_index < total_rows:
                    row = rows[current_index]
                    image_name = row[0] if len(row) > 0 else ""
                    format = row[1] if len(row) > 1 else "png"
                    description = row[2] if len(row) > 2 else ""
                    
                    # Combine description with base prompt
                    full_prompt = f"{description}, {base_prompt}"
                    filename = f"{image_name}.{format}"
                    
                    print(f"Processing {current_index + 1}/{total_rows}: {filename}")
                    print(f"Prompt: {full_prompt}")
                    
                    next_index = current_index + 1
                    continue_batch = True
                    return (full_prompt, filename, base_negative, next_index, total_rows, continue_batch)
                
                print("Batch processing complete!")
                return ("All images processed", "complete.png", base_negative, current_index, total_rows, False)
                
        except Exception as e:
            print(f"Error in batch processing: {str(e)}")
            return ("Error", "error.png", base_negative, 0, 0, False)


# Register the nodes
NODE_CLASS_MAPPINGS = {
    "GrafsCSVLoader": GrafsCSVLoader,
    "CSVRowCount": CSVRowCount,
    "CreateExampleCSV": CreateExampleCSV,
    "CreateImageListCSV": CreateImageListCSV,
    "GrafsImagePromptCSV": GrafsImagePromptCSV,
    "GrafsBatchImageGenerator": GrafsBatchImageGenerator
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "GrafsCSVLoader": "Grafs CSV Loader",
    "CSVRowCount": "CSV Row Count",
    "CreateExampleCSV": "Create Example CSV",
    "CreateImageListCSV": "Create Image List CSV",
    "GrafsImagePromptCSV": "Grafs Image Prompt Generator",
    "GrafsBatchImageGenerator": "Grafs Batch Image Generator"
} 